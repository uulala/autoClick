function gg(gname, type) {
    let res = null
    switch (type) {
        case 'id':
            res = document.getElementById(gname)
            break;
        case 'class':
            res = document.getElementsByClassName(gname)
            break;
        case 'tag':
            res = document.getElementsByTagName(gname)
            break;
        case 'name':
            res = document.getElementsByName(gname)
            break;
    }
    return res
}

window.addEventListener('load', () => {
    console.log('onload')
    gg('c-type', 'id').value = 'tag'
    gg('c-tag', 'id').value = 'span'
    gg('c-text', 'id').value = '立即领取'
    console.log(gg('start-btn', 'class')[0])
    gg('start-btn', 'class')[0].onclick = () => {
        chrome.storage.local.set({ "tasks": { tagName: gg('c-tag', 'id').value, type: gg('c-type', 'id').value, tagText: gg('c-text', 'id').value } }, function () {
            // chrome.extension.sendRequest({ msg: "秒杀任务开始！" });
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(tabs[0].id, { file: 'js/excute.js' });
            });
        });
    }
})

