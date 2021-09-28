function sleep(value, tt) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            resolve()
            clearTimeout(timer)
        }, tt || Math.random() * 10 * 1000)
    })
}

function myQueue(arr, cb, tt) {
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

            sleep(temp[0], tt).then(res => {
                console.log('resolved:', arrLen + 1 - tempLen)
                myStatus = 'f'
                temp.shift()
                cb(temp[0])
            }).catch(err => myStatus = 'r')
        } else {
            console.log('pending...')
        }
    }, tt)
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

function doClick(currentCName, type, currentLabel, tt) {
    const BTNS = [...gg(currentCName, type)]
    const temp = BTNS.filter(item => item.textContent.replace(/\s+/g, "") === currentLabel)
    console.log('all:', temp)
    myQueue(temp, (item) => item.click(), tt || 500)
}

function skillClick(tagName, type, tagText, date, time) {
    const targetTime = new Date(`${date} ${time}`)
    const timer = setInterval(() => {
        const temp = targetTime - new Date().getTime()
        if ((temp < 100 && temp > -100)) {
            console.log('log...', temp)
            doClick(tagName, type, tagText, 10)
        }
        // 超过 1.2秒，则停止计时
        if (temp < -1200) {
            console.log('clear !')
            clearInterval(timer)
        }
    }, 100);
}

// skillClick('span', 'tag', '创建直播', '2021-9-28', '14:07:00')

// --------------------------------------------------------------------------

chrome.storage.local.get({ "tasks": new Array() }, function (value) {
    console.log('开始执行...')
    const { tagName, type, tagText, date, time, } = value.tasks
    if (!time) {
        doClick(tagName, type, tagText)
    } else {
        skillClick(tagName, type, tagText, date, time)
    }
})
