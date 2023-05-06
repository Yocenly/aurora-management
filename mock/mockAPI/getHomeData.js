import Mock from 'mockjs';

export default {
  getCountData() {
    const json = require('../mockData/homeCountData.json');
    return {
      code: 200,
      message: Mock.mock(json),
    };
  },
  getOptionData() {
    const json = require('../mockData/homeOptionData.json');
    return {
      code: 200,
      message: Mock.mock(json),
    };
  },
};
