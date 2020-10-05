setTimeout(function () {
  document.getElementById('js-loading').style.opacity = '0'
  document.body.style.overflow = 'visible'
}, 5000)

setTimeout(function () {
  document.getElementById('js-loading').style.display = 'none'
}, 5500)

window.onscroll = () => {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    document.getElementById('js-go-top').style.display = 'block'
  } else {
    document.getElementById('js-go-top').style.display = 'none'
  }
}

// go-top btn
document.getElementById('js-go-top').onclick = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

var xhr = new XMLHttpRequest()
xhr.open(
  'get',
  'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json?fbclid=IwAR3POtjHua2FKHJuPv4X7pHOEWcZ8-XAaI4VRnT9c9ZhNjAKi7qDv_0aIeY',
)
xhr.send()
xhr.onload = function () {
  var data = JSON.parse(xhr.responseText)
  var option = ''
  var li
  var district = document.getElementById('district')
  var title = document.getElementById('js-show-title')
  var list = document.getElementById('js-show-list')
  var btnList = document.getElementById('js-show-filter-btn')
  // var filterBtn = document.getElementById('js-filter-btn');
  var zoneTotal = {}

  // init addOption
  option = document.createElement('option')
  option.value = 'null'
  option.text = '- - 請選擇行政區 - -'
  district.add(option)

  for (var i = 0; i < data.result.records.length; i++) {
    var zoneContent = data.result.records[i].Zone
    if (!zoneTotal[zoneContent]) {
      zoneTotal[zoneContent] = 1
    } else {
      zoneTotal[zoneContent] += 1
    }
  }

  var zoneTotalSorted = Object.keys(zoneTotal).sort(function (a, b) {
    return zoneTotal[b] - zoneTotal[a]
  })

  for (var key in zoneTotalSorted) {
    option = document.createElement('option')
    option.value = zoneTotalSorted[key]
    option.text = zoneTotalSorted[key] + ' (' + zoneTotal[zoneTotalSorted[key]] + ')'
    district.add(option)
  }

  // init btnList
  btnList.innerHTML = `
    <li class="l-filter__item"><input type="button" class="l-filter__btn js-filter-btn" id="js-filter-btn0" value="${zoneTotalSorted[0]}"></li>
    <li class="l-filter__item"><input type="button" class="l-filter__btn js-filter-btn" id="js-filter-btn1" value="${zoneTotalSorted[1]}"></li>
    <li class="l-filter__item"><input type="button" class="l-filter__btn js-filter-btn" id="js-filter-btn2" value="${zoneTotalSorted[2]}"></li>
    <li class="l-filter__item"><input type="button" class="l-filter__btn js-filter-btn" id="js-filter-btn3" value="${zoneTotalSorted[3]}"></li>
    `

  // init Alllist
  for (var i = 0; i < data.result.records.length; i++) {
    title.textContent = '高雄市全區'
    li = document.createElement('li')
    list.appendChild(li)
    li.innerHTML = `
            <li class="content__item" id="${data.result.records[i].Id}">
                <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                    <div class="item__title flex-row">
                        <h3>${data.result.records[i].Name}</h3>
                        <h4>${data.result.records[i].Zone}</h4>
                    </div>
                </div>
                <ul class="item__details">
                    <li class="flex-row align-items-center">
                        <img src="pic/icons_clock.png" alt="">
                        <p>${data.result.records[i].Opentime}</p>
                    </li>
                    <li class="flex-row align-items-center">
                        <img src="pic/icons_pin.png" alt="">
                        <p>${data.result.records[i].Add}</p>
                    </li>
                    <li class="flex-row">
                        <span class="flex-row align-items-center">
                            <img src="pic/icons_phone.png" alt="">
                            <p>${data.result.records[i].Tel}</p>
                        </span>
                        <span class="flex-row align-items-center l-free">
                            <img src="pic/icons_tag.png" alt="">
                            <p>${data.result.records[i].Ticketinfo}</p>
                        </span>
                    </li>
                </ul>
            </li>
        `
  }

  // show selectResult
  district.addEventListener('change', function () {
    list.innerHTML = '' // 清除 list(清除 ul 裡的所有 li)
    for (var i = 0; i < data.result.records.length; i++) {
      if (data.result.records[i].Zone == district.value) {
        title.textContent = data.result.records[i].Zone
        li = document.createElement('li')
        list.appendChild(li)
        li.innerHTML = `
                    <li class="content__item" id="${data.result.records[i].Id}">
                        <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                            <div class="item__title flex-row">
                                <h3>${data.result.records[i].Name}</h3>
                                <h4>${data.result.records[i].Zone}</h4>
                            </div>
                        </div>
                        <ul class="item__details">
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_clock.png" alt="">
                                <p>${data.result.records[i].Opentime}</p>
                            </li>
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_pin.png" alt="">
                                <p>${data.result.records[i].Add}</p>
                            </li>
                            <li class="flex-row">
                                <span class="flex-row align-items-center">
                                    <img src="pic/icons_phone.png" alt="">
                                    <p>${data.result.records[i].Tel}</p>
                                </span>
                                <span class="flex-row align-items-center l-free">
                                    <img src="pic/icons_tag.png" alt="">
                                    <p>${data.result.records[i].Ticketinfo}</p>
                                </span>
                            </li>
                        </ul>
                    </li>
                `
      } else if (district.value == 'null') {
        title.textContent = '高雄市全區'
        li = document.createElement('li')
        list.appendChild(li)
        li.innerHTML = `
                    <li class="content__item" id="${data.result.records[i].Id}">
                        <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                            <div class="item__title flex-row">
                                <h3>${data.result.records[i].Name}</h3>
                                <h4>${data.result.records[i].Zone}</h4>
                            </div>
                        </div>
                        <ul class="item__details">
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_clock.png" alt="">
                                <p>${data.result.records[i].Opentime}</p>
                            </li>
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_pin.png" alt="">
                                <p>${data.result.records[i].Add}</p>
                            </li>
                            <li class="flex-row">
                                <span class="flex-row align-items-center">
                                    <img src="pic/icons_phone.png" alt="">
                                    <p>${data.result.records[i].Tel}</p>
                                </span>
                                <span class="flex-row align-items-center l-free">
                                    <img src="pic/icons_tag.png" alt="">
                                    <p>${data.result.records[i].Ticketinfo}</p>
                                </span>
                            </li>
                        </ul>
                    </li>
                `
      }
    }
  })

  //  show btnResult
  var btn0 = document.getElementById('js-filter-btn0')
  var btn1 = document.getElementById('js-filter-btn1')
  var btn2 = document.getElementById('js-filter-btn2')
  var btn3 = document.getElementById('js-filter-btn3')

  btn0.addEventListener('click', function () {
    list.innerHTML = '' // 清除 list(清除 ul 裡的所有 li)
    for (var i = 0; i < data.result.records.length; i++) {
      if (data.result.records[i].Zone == btn0.value) {
        title.textContent = data.result.records[i].Zone
        li = document.createElement('li')
        list.appendChild(li)
        li.innerHTML = `
                    <li class="content__item" id="${data.result.records[i].Id}">
                        <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                            <div class="item__title flex-row">
                                <h3>${data.result.records[i].Name}</h3>
                                <h4>${data.result.records[i].Zone}</h4>
                            </div>
                        </div>
                        <ul class="item__details">
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_clock.png" alt="">
                                <p>${data.result.records[i].Opentime}</p>
                            </li>
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_pin.png" alt="">
                                <p>${data.result.records[i].Add}</p>
                            </li>
                            <li class="flex-row">
                                <span class="flex-row align-items-center">
                                    <img src="pic/icons_phone.png" alt="">
                                    <p>${data.result.records[i].Tel}</p>
                                </span>
                                <span class="flex-row align-items-center l-free">
                                    <img src="pic/icons_tag.png" alt="">
                                    <p>${data.result.records[i].Ticketinfo}</p>
                                </span>
                            </li>
                        </ul>
                    </li>
                `
      }
    }
  })

  btn1.addEventListener('click', function () {
    list.innerHTML = '' // 清除 list(清除 ul 裡的所有 li)
    for (var i = 0; i < data.result.records.length; i++) {
      if (data.result.records[i].Zone == btn1.value) {
        title.textContent = data.result.records[i].Zone
        li = document.createElement('li')
        list.appendChild(li)
        li.innerHTML = `
                    <li class="content__item" id="${data.result.records[i].Id}">
                        <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                            <div class="item__title flex-row">
                                <h3>${data.result.records[i].Name}</h3>
                                <h4>${data.result.records[i].Zone}</h4>
                            </div>
                        </div>
                        <ul class="item__details">
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_clock.png" alt="">
                                <p>${data.result.records[i].Opentime}</p>
                            </li>
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_pin.png" alt="">
                                <p>${data.result.records[i].Add}</p>
                            </li>
                            <li class="flex-row">
                                <span class="flex-row align-items-center">
                                    <img src="pic/icons_phone.png" alt="">
                                    <p>${data.result.records[i].Tel}</p>
                                </span>
                                <span class="flex-row align-items-center l-free">
                                    <img src="pic/icons_tag.png" alt="">
                                    <p>${data.result.records[i].Ticketinfo}</p>
                                </span>
                            </li>
                        </ul>
                    </li>
                `
      }
    }
  })

  btn2.addEventListener('click', function () {
    list.innerHTML = '' // 清除 list(清除 ul 裡的所有 li)
    for (var i = 0; i < data.result.records.length; i++) {
      if (data.result.records[i].Zone == btn2.value) {
        title.textContent = data.result.records[i].Zone
        li = document.createElement('li')
        list.appendChild(li)
        li.innerHTML = `
                    <li class="content__item" id="${data.result.records[i].Id}">
                        <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                            <div class="item__title flex-row">
                                <h3>${data.result.records[i].Name}</h3>
                                <h4>${data.result.records[i].Zone}</h4>
                            </div>
                        </div>
                        <ul class="item__details">
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_clock.png" alt="">
                                <p>${data.result.records[i].Opentime}</p>
                            </li>
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_pin.png" alt="">
                                <p>${data.result.records[i].Add}</p>
                            </li>
                            <li class="flex-row">
                                <span class="flex-row align-items-center">
                                    <img src="pic/icons_phone.png" alt="">
                                    <p>${data.result.records[i].Tel}</p>
                                </span>
                                <span class="flex-row align-items-center l-free">
                                    <img src="pic/icons_tag.png" alt="">
                                    <p>${data.result.records[i].Ticketinfo}</p>
                                </span>
                            </li>
                        </ul>
                    </li>
                `
      }
    }
  })

  btn3.addEventListener('click', function () {
    list.innerHTML = '' // 清除 list(清除 ul 裡的所有 li)
    for (var i = 0; i < data.result.records.length; i++) {
      if (data.result.records[i].Zone == btn3.value) {
        title.textContent = data.result.records[i].Zone
        li = document.createElement('li')
        list.appendChild(li)
        li.innerHTML = `
                    <li class="content__item" id="${data.result.records[i].Id}">
                        <div class="item__cover flex-row" style="background: url('${data.result.records[i].Picture1}') no-repeat center; background-size: cover;">
                            <div class="item__title flex-row">
                                <h3>${data.result.records[i].Name}</h3>
                                <h4>${data.result.records[i].Zone}</h4>
                            </div>
                        </div>
                        <ul class="item__details">
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_clock.png" alt="">
                                <p>${data.result.records[i].Opentime}</p>
                            </li>
                            <li class="flex-row align-items-center">
                                <img src="pic/icons_pin.png" alt="">
                                <p>${data.result.records[i].Add}</p>
                            </li>
                            <li class="flex-row">
                                <span class="flex-row align-items-center">
                                    <img src="pic/icons_phone.png" alt="">
                                    <p>${data.result.records[i].Tel}</p>
                                </span>
                                <span class="flex-row align-items-center l-free">
                                    <img src="pic/icons_tag.png" alt="">
                                    <p>${data.result.records[i].Ticketinfo}</p>
                                </span>
                            </li>
                        </ul>
                    </li>
                `
      }
    }
  })

  var showDetail = document.querySelector('.content__list')
  showDetail.addEventListener('click', function (e) {
    for (var n = 0; n < e.path.length; n++) {
      if (e.path[n].className === 'content__item') {
        for (var i = 0; i < data.result.records.length; i++) {
          if (data.result.records[i].Id === e.path[n].id) {
            var modal = document.querySelector('.lightbox')
            modal.style.display = 'flex'
            modal.innerHTML = `
                            <img src="${data.result.records[i].Picture1}" alt="">
                            <input type="button" value="&#Xe5cd" class="lightbox__btn js-close-lightbox">
                        `
            var closeModal = document.querySelector('.js-close-lightbox')
            closeModal.addEventListener('click', function () {
              modal.style.display = 'none'
            })
          }
        }
      }
    }
    console.log(e)
  })
}
