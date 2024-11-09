import React, { useEffect } from 'react'

const ChatBot = () => {

  useEffect(() => {
    ;(function (d, m) {
      var kommunicateSettings = {
        appId: '1a2f23e74c6de8bf756c1d2247eae6bc6',
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        // visitor: { userId: `guest_${Date.now()}` },
      }

      // window.sessionStorage.removeItem('kommunicate')

      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app'
      var h = document.getElementsByTagName('head')[0]
      h.appendChild(s)
      window.kommunicate = m
      m._globals = kommunicateSettings
    })(document, window.kommunicate || {})
  }, [])

  return <div></div>
}

export default ChatBot
