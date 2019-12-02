// function formatNumber(n) {
//   const str = n.toString()
//   return str[1] ? str : `0${str}`
// }

// export function formatTime(date) {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()
//
//   const t1 = [year, month, day].map(formatNumber).join('/')
//   const t2 = [hour, minute, second].map(formatNumber).join(':')
//
//   return `${t1} ${t2}`
// }

// api接口
const baseUrl = 'https://pokemon.fantasticmao.cn';

export function ajax(url, data, method, success = () => {
}, error = () => {
}) {
  const key = data.storage;
  if (key) {
    delete data.storage;
    const _data = mpvue.getStorageSync(key);
    if (_data) {
      // if (key !== 'getEvolve')
      success({ data: _data });
      // else
      //   success(_data);
      return;
    }
  }
  let now_url = baseUrl + url;
  if (data.baseUrl) {
    now_url = data.baseUrl + url;
    delete data.baseUrl;
  }
  mpvue.request({
    url: now_url,
    data,
    method,
    success: function (res) {

      if (key === 'getEvolve') {
        res.data = { code: 200, data: res.data }
      }

      if (res.statusCode === 200) {
        // if (res.data.code !== 200 && key !== 'getEvolve') {
        //   mpvue.showToast({
        //     icon: 'none',
        //     title: res.data.message
        //   });
        //   error(res)
        // } else {
        if (key) mpvue.setStorageSync(key, res.data.data ? res.data.data : res.data);
        success(res.data);
        // }
      } else {
        mpvue.showToast({
          icon: 'none',
          title: '服务器异常'
        });
        error(res)
      }
      // if (res.data.code == 200) {
      //   let list = res.data.content  //此处res.data为后端返回值，前端可以此处进行数据的处理
      //   that.setData({
      //     discussList: list,
      //   })
      // }
      // else {
      //   wx.showToast({
      //     title: '加载失败',
      //     icon: 'loading'
      //   })
      // }
    }
  })
}

// 基础点数剔除 0
export function effortValue(eff) {
  eff = eff.split(',');
  let list = [];
  eff.forEach(e => {
    if (e.indexOf('0') === -1) list.push(e);
  });
  return list.join(',')
}

// 返回属性id
export function isProperty(type) {

  switch (type) {
    case '物理':
      return 91;
    case '特殊':
      return 92;
    case '变化':
      return 93;
    case '一般':
      return 1;
    case '飞行':
      return 2;
    case '火':
      return 3;
    case '超能力':
      return 4;
    case '水':
      return 5;
    case '虫':
      return 6;
    case '电':
      return 7;
    case '岩石':
      return 8;
    case '草':
      return 9;
    case '幽灵':
      return 10;
    case '冰':
      return 11;
    case '龙':
      return 12;
    case '格斗':
      return 13;
    case '恶':
      return 14;
    case '毒':
      return 15;
    case '钢':
      return 16;
    case '地面':
      return 17;
    case '妖精':
      return 18;
    default:
      return 20;
  }
}

// 计算个体
export function restrainCalc(list, index) {

  // 计算数值拔群
  function calc(i, num) {
    if (num === 0) {
      list[i] = 0;
    } else if (num === 1) {
      list[i] = list[i] * 2;
    } else if (num === -1) {
      list[i] = list[i] / 2;
    }
  }

  switch (index) {
    case 1: //一般
      calc(12, 1);
      calc(9, 0);
      return list;
    case 2: // 飞行
      calc(7, 1);
      calc(10, 1);
      calc(6, 1);
      calc(12, -1);
      calc(5, -1);
      calc(8, -1);
      calc(16, 0);
      return list;
    case 3: // 火
      calc(16, 1);
      calc(4, 1);
      calc(7, 1);
      calc(2, -1);
      calc(8, -1);
      calc(10, -1);
      calc(5, -1);
      calc(15, -1);
      calc(17, -1);
      return list;
    case 4: // 超能力
      calc(5, 1);
      calc(9, 1);
      calc(13, 1);
      calc(12, -1);
      calc(3, -1);
      return list;
    case 5: //水
      calc(6, 1);
      calc(8, 1);
      calc(2, -1);
      calc(4, -1);
      calc(10, -1);
      calc(15, -1);
      return list;
    case 6: // 虫
      calc(1, 1);
      calc(2, 1);
      calc(7, 1);
      calc(8, -1);
      calc(12, -1);
      calc(16, -1);
      return list;
    case 7: // 电
      calc(16, 1);
      calc(6, -1);
      calc(1, -1);
      calc(15, -1);
      return list;
    case 8: // 岩石
      calc(4, 1);
      calc(8, 1);
      calc(12, 1);
      calc(15, 1);
      calc(16, 1);
      calc(0, -1);
      calc(1, -1);
      calc(2, -1);
      calc(14, -1);
      return list;
    case 9: //  草
      calc(2, 1);
      calc(10, 1);
      calc(1, 1);
      calc(5, 1);
      calc(14, 1);
      calc(8, -1);
      calc(4, -1);
      calc(6, -1);
      calc(16, -1);
      return list;
    case 10:  // 幽灵
      calc(9, 1);
      calc(13, 1);
      calc(0, 0);
      calc(12, 0);
      calc(5, -1);
      calc(14, -1);
      return list;
    case 11: // 冰
      calc(2, 1);
      calc(7, 1);
      calc(12, 1);
      calc(15, 1);
      calc(10, -1);
      return list;
    case 12: // 龙
      calc(10, 1);
      calc(11, 1);
      calc(17, 1);
      calc(2, -1);
      calc(4, -1);
      calc(6, -1);
      calc(8, -1);
      return list;
    case 13: // 格斗
      calc(1, 1);
      calc(3, 1);
      calc(17, 1);
      calc(5, -1);
      calc(7, -1);
      calc(13, -1);
      return list;
    case 14:  // 恶
      calc(12, 1);
      calc(5, 1);
      calc(17, 1);
      calc(9, -1);
      calc(13, -1);
      calc(3, 0);
      return list;
    case 15: // 毒
      calc(16, 1);
      calc(3, 1);
      calc(14, -1);
      calc(5, -1);
      calc(8, -1);
      calc(12, -1);
      calc(17, -1);
      return list;
    case 16:  // 钢
      calc(2, 1);
      calc(12, 1);
      calc(17, -1);
      calc(0, -1);
      calc(8, -1);
      calc(1, -1);
      calc(10, -1);
      calc(3, -1);
      calc(5, -1);
      calc(7, -1);
      calc(11, -1);
      calc(15, -1);
      calc(17, -1);
      calc(14, 0);
      return list;
    case 17: // 地面
      calc(4, 1);
      calc(8, 1);
      calc(10, 1);
      calc(14, -1);
      calc(7, -1);
      calc(6, 0);
      return list;
    case 18: // 妖
      calc(14, 1);
      calc(15, 1);
      calc(5, -1);
      calc(12, -1);
      calc(13, -1);
      calc(11, 0);
      return list;
    default:
      return list;
  }
}

// HP（种族值×2＋基础点数÷4＋个体值）×等级÷100＋等级＋10
function hpCalc(number_race, number_capacity, number_unit, level) {
  // 同下
  const number = (number_race * 2 + number_capacity / 4 + number_unit) * level / 100 + level + 10;
  return isIndex(parseInt(number));
}

// 能力值 ＝ （（种族值×2＋基础点数÷4＋个体值）×等级÷100＋5）×性格修正
function capacityCalc(number_race, number_capacity, number_unit, level, amend) {
  // number_capacity  min 0 max 252
  // number_unit min 0 max 31
  // level max 100
  // amend 0.9 1 1.1
  const number = ((number_race * 2 + number_capacity / 4 + number_unit) * level / 100 + 5) * amend;
  return isIndex(parseInt(number));
}

// 区间
export function section(baseStat) {

  let b0_50 = hpCalc(baseStat.hp, 0, 0, 50) + ' ~ ' + hpCalc(baseStat.hp, 252, 31, 50);
  let b1_50 = capacityCalc(baseStat.attack, 0, 0, 50, 0.9) + ' ~ ' + capacityCalc(baseStat.attack, 252, 31, 50, 1.1);
  let b2_50 = capacityCalc(baseStat.defense, 0, 0, 50, 0.9) + ' ~ ' + capacityCalc(baseStat.defense, 252, 31, 50, 1.1);
  let b3_50 = capacityCalc(baseStat.spAttack, 0, 0, 50, 0.9) + ' ~ ' + capacityCalc(baseStat.spAttack, 252, 31, 50, 1.1);
  let b4_50 = capacityCalc(baseStat.spDefense, 0, 0, 50, 0.9) + ' ~ ' + capacityCalc(baseStat.spDefense, 252, 31, 50, 1.1);
  let b5_50 = capacityCalc(baseStat.speed, 0, 0, 50, 0.9) + ' ~ ' + capacityCalc(baseStat.speed, 252, 31, 50, 1.1);

  let b0_100 = hpCalc(baseStat.hp, 0, 0, 100) + ' ~ ' + hpCalc(baseStat.hp, 252, 31, 100);
  let b1_100 = capacityCalc(baseStat.attack, 0, 0, 100, 0.9) + ' ~ ' + capacityCalc(baseStat.attack, 252, 31, 100, 1.1);
  let b2_100 = capacityCalc(baseStat.defense, 0, 0, 100, 0.9) + ' ~ ' + capacityCalc(baseStat.defense, 252, 31, 100, 1.1);
  let b3_100 = capacityCalc(baseStat.spAttack, 0, 0, 100, 0.9) + ' ~ ' + capacityCalc(baseStat.spAttack, 252, 31, 100, 1.1);
  let b4_100 = capacityCalc(baseStat.spDefense, 0, 0, 100, 0.9) + ' ~ ' + capacityCalc(baseStat.spDefense, 252, 31, 100, 1.1);
  let b5_100 = capacityCalc(baseStat.speed, 0, 0, 100, 0.9) + ' ~ ' + capacityCalc(baseStat.speed, 252, 31, 100, 1.1);
  return {
    b0_50,
    b1_50,
    b2_50,
    b3_50,
    b4_50,
    b5_50,
    b0_100,
    b1_100,
    b2_100,
    b3_100,
    b4_100,
    b5_100,
  };
}

// 根据名字获取pokemon
export function getPokemon(names, id) {
  let _list = [];
  let _id = [];
  [1, 2, 3, 4, 5, 6, 7, 8].forEach(i => {
    const _arr = mpvue.getStorageSync('list' + i);
    if (_arr)
      _arr.forEach(res => {
        if (names.indexOf(res.nameZh) !== -1) {
          res.index = isIndex(res.index);
          if (id) return _id.push(res.index);
          res.g1 = isProperty(res.type1);
          res.g2 = isProperty(res.type2);
          _list.push(res);
        }
      });
    else {
      mpvue.switchTab({ url: '/pages/index/main' })
    }
  });
  if (id) return _id;
  return _list
}

// 补齐三位数
export function isIndex(i) {
  i = i.toString();
  const num = i.length;
  if (num === 1) return '00' + i;
  else if (num === 2) return '0' + i;
  else return i;
}

// 全局error处理
export function globalError() {
  mpvue.hideLoading();
  mpvue.showToast({
    title: '加载失败',
    icon: 'none',
  });
  setTimeout(() => {
    mpvue.switchTab({ url: '/pages/index/main' })
  }, 1500);
}

// 详情跳转宝可梦详情
export function globalToPokemonDetail(index) {
  mpvue.navigateTo({
    url: "/pages/detail/main?index=" + index
  });
}

// 详情跳转宝可梦详情
export function globalGoBackHome() {
  mpvue.switchTab({ url: '/pages/index/main' })
}
