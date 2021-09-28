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
    // 尝试获取上次的值
    chrome.storage.local.get({ "tasks": new Array() }, function (value) {
        const { tagName, type, tagText, date, time, } = value.tasks
        const nowDate = new Date()
        gg('c-date', 'id').value = date || `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`
        gg('c-time', 'id').value = time || '14:00:00'
        gg('c-type', 'id').value = type || 'tag'
        gg('c-tag', 'id').value = tagName || 'span'
        gg('c-text', 'id').value = tagText || '立即领取'
    })
    gg('start-btn', 'class')[0].onclick = () => {
        chrome.storage.local.set({
            "tasks":
            {
                date: gg('c-date', 'id').value,
                time: gg('c-time', 'id').value,
                tagName: gg('c-tag', 'id').value,
                type: gg('c-type', 'id').value,
                tagText: gg('c-text', 'id').value
            }
        }, function () {
            // chrome.extension.sendRequest({ msg: "任务开始！" });
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.executeScript(tabs[0].id, { file: 'js/excute.js' });
            });
        });
    }
})

