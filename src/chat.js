import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const ChatBot = () => {
  // const [userId, setUserId] = useState(null)
  // const [userName, setUserName] = useState(null)
  const [loging, setLoging] = useState(false)

  // const checkLogin = () => {
  //   if (Cookies.get('user_data')) {
  //     const name = authService.getCurrentName()
  //     const id = authService.getCurrentPhone()
  //     setUserId(id)
  //     setUserName(name)

  //     if (id && name) {
  //       return true
  //       // console.log(userName)
  //     }
  //   }
  //   return false
  // }

  useEffect(() => {
    const initChat = () => {
      if (!loging) {
        const user = Cookies.get('user_data')
        let userData
        if (user) userData = JSON.parse(user)

        if (userData) {
          ;(function (d, m) {
            var kommunicateSettings = {
              appId: '1a2f23e74c6de8bf756c1d2247eae6bc6',
              userId: userData.phoneNumber,
              userName: userData.fullName,
              popupWidget: true,
              automaticChatOpenOnNavigation: true,
              emojilibrary: true,
              quickReplies: [
                'Tôi muốn mua hàng',
                'Thanh toán trực tuyến như thế nào?',
                'Tôi muốn tạo tài khoản',
              ],
            }

            var s = document.createElement('script')
            s.type = 'text/javascript'
            s.async = true
            s.src = 'https://widget.kommunicate.io/v2/kommunicate.app'
            var h = document.getElementsByTagName('head')[0]
            h.appendChild(s)
            window.kommunicate = m
            m._globals = kommunicateSettings
          })(document, window.kommunicate || {})
        } else {
          ;(function (d, m) {
            var kommunicateSettings = {
              appId: '1a2f23e74c6de8bf756c1d2247eae6bc6',
              popupWidget: true,
              automaticChatOpenOnNavigation: true,
              emojilibrary: true,
              quickReplies: ['Hướng dẫn đặt hàng', 'Kiểm tra đơn hàng', 'Hướng dẫn đăng nhập'],
            }

            var s = document.createElement('script')
            s.type = 'text/javascript'
            s.async = true
            s.src = 'https://widget.kommunicate.io/v2/kommunicate.app'
            var h = document.getElementsByTagName('head')[0]
            h.appendChild(s)
            window.kommunicate = m
            m._globals = kommunicateSettings
          })(document, window.kommunicate || {})
        }

        setLoging(true)
      }
    }
    initChat(true)
  }, [loging])

  return <div></div>
}

export default ChatBot
