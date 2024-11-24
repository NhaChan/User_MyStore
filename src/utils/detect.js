import * as tf from '@tensorflow/tfjs'
import labels from './labels.json'

const numClass = labels.length

/**
 * Preprocess image / frame before forwarded into the model
 * @param {HTMLVideoElement|HTMLImageElement} source
 * @param {Number} modelWidth
 * @param {Number} modelHeight
 * @returns input tensor, xRatio and yRatio
 */
const preprocess = (source, modelWidth, modelHeight) => {
  let xRatio, yRatio // ratios for boxes

  const input = tf.tidy(() => {
    const img = tf.browser.fromPixels(source)

    // padding image to square => [n, m] to [n, n], n > m
    const [h, w] = img.shape.slice(0, 2) // get source width and height
    const maxSize = Math.max(w, h) // get max size
    const imgPadded = img.pad([
      [0, maxSize - h], // padding y [bottom only]
      [0, maxSize - w], // padding x [right only]
      [0, 0],
    ])

    xRatio = maxSize / w // update xRatio
    yRatio = maxSize / h // update yRatio

    return tf.image
      .resizeBilinear(imgPadded, [modelWidth, modelHeight]) // resize frame
      .div(255.0) // normalize
      .expandDims(0) // add batch
  })

  return [input, xRatio, yRatio]
}

/**
 * Function run inference and do detection from source.
 * @param {HTMLImageElement|HTMLVideoElement} source
 * @param {tf.GraphModel} model loaded YOLOv8 tensorflow.js model
 * @param {HTMLCanvasElement} canvasRef canvas reference
 * @param {VoidFunction} callback function to run after detection process
 */
export const detect = async (source, model) => {
  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3)
  tf.engine().startScope()
  const [input] = preprocess(source, modelWidth, modelHeight)
  const res = model.net.execute(input)
  const transRes = res.transpose([0, 2, 1])

  const boxes = tf.tidy(() => {
    const boxes = transRes.slice([0, 0, 0], [-1, -1, 4]).squeeze(0)
    return boxes
  })

  const [scores, classes] = tf.tidy(() => {
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0)
    return [rawScores.max(1), rawScores.argMax(1)]
  })

  const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2)
  const classes_data = classes.gather(nms, 0).dataSync()

  //lấy % cao nhất
  // const maxScore = scores.dataSync()[0] // Tỉ lệ cao nhất
  // const maxScoreIndex = classes_data[0] // Index của lớp có tỉ lệ cao nhất

  // const predictedLabels = labels[maxScoreIndex]
  // console.log('highestScoreLabelh', predictedLabels)

  const predictedLabels = Array.from(
    new Set(Array.from(classes_data).map((index) => labels[index])),
  )

  console.log(predictedLabels)
  tf.dispose([res, transRes, scores, classes, nms])
  tf.engine().endScope()

  return predictedLabels
}
