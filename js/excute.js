function sleep(value) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            resolve()
            clearTimeout(timer)
        }, Math.random() * 10 * 1000)
    })
}

function myQueue(arr, cb) {
    const temp = [...arr]

    let myStatus = 'p', isFirst = true
    const arrLen = arr.length
    const timer = setInterval(() => {
        const tempLen = temp.length
        if (tempLen <= 0) {
            console.log('finish !')
            clearInterval(timer)
            return
        }
        if (isFirst || myStatus === 'f') {
            isFirst = false
            myStatus = 'p'

            sleep(temp[0]).then(res => {
                console.log('resolved:', arrLen + 1 - tempLen)
                myStatus = 'f'
                temp.shift()
                cb(temp[0])
            }).catch(err => myStatus = 'r')
        } else {
            console.log('pending...')
        }
    }, 500)
}

function gg(gname, type) {
    let res = null
    switch (type) {
        case 'id':
            res = [document.getElementById(gname)]
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

function doClick(currentCName, type, currentLabel) {
    const BTNS = [...gg(currentCName, type)]
    const temp = BTNS.filter(item => item.textContent.replace(/\s+/g, "") === currentLabel)
    console.log('BTNS', temp)
    myQueue(temp, (item) => item.click())
}

// --------------------------------------------------------------------------

chrome.storage.local.get({ "tasks": new Array() }, function (value) {
    console.log('开始执行')
    var tasks = value.tasks;
    const { tagName, type, tagText } = tasks
    doClick(tagName, type, tagText)
})
