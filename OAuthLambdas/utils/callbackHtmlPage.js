function getScript(mess, content) {
  return `<html><body><script>
    (function() {
        function receiveMessage(e) {
        console.log('authorization:github:${mess}:${JSON.stringify(content)}')
        window.opener.postMessage(
            'authorization:github:${mess}:${JSON.stringify(content)}',
            '*'
        )
        window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false)
        window.opener.postMessage("authorizing:github", "*")
        })()
    </script></body></html>`;
}

exports.getScript = getScript;
