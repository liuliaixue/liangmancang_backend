'new task';

const OrderType = {
  DEFAULT: 'DEFAULT',
  WORD_COMMENT: 'WORD_COMMENT',
  PICTURE_COMMENT: 'PICTURE_COMMENT'
};

var newTask = `{
  goodsName: "木林森皮鞋男冬季加绒韩版商务休闲黑色真皮英伦正装内增高男鞋子",
  goodsLink:
    "https://detail.tmall.com/item.htm?id=595735103244&spm=a21bz.7725275.1998564545.1.2e245fc2SVQnDL&umpChannel=qianggou&u_channel=qianggou",
  goodsImage:
    "https://img.alicdn.com/imgextra/i1/3372687502/O1CN013D7wEd25Hxol9V6qT_!!3372687502.jpg_430x430q90.jpg",
  goodsPrice: 39900,
  goodsTotal: 1,
  goodsPriceShowed: 39900,
  goodsSpecification: "尺码:37,颜色:红色",
  isFreeShipping: false,


  orders: [
    {
      type: DEFAULT,
      buyTimes: 1,
      browseTimes: 2,
      collectTimes: 1,
      collect: "收藏商品",
      searchKeyword: "鞋子"
    },
    {
      type: DEFAULT,
      buyTimes: 0,
      browseTimes: 2,
      collectTimes: 1,
      collect: "收藏店铺",
      searchKeyword: "内增高男鞋"
    },
    {
      type: WORD_COMMENT,
      buyTimes: 1,
      browseTimes: 8,
      collectTimes: 1,
      collect: "收藏商品",
      searchKeyword: "鞋子",

      comment: "鞋子很不错,很适合我儿子"
    },
    {
      type: PICTURE_COMMENT,
      buyTimes: 1,
      browseTimes: 2,
      collectTimes: 1,
      collect: "收藏商品",

      searchKeyword: "鞋子",
      goodsSpecification: "尺码:38,颜色:红色",

      comment: "鞋子很不错,很适合我儿子",
      pictures: ["", ""],
      remark: "给出舒服,尺码准确,合脚,老公喜欢等评论,要有评论30字以上"
    }
  ],

  startTime: 1572566400000#new Date("2019-11-01").getTime(),
  endTime: 1572652800000#new Date("2019-11-02").getTime(),

  extraCommission: 100,
  extraImages: [""],
  remark: "111",
  storeid: "objectid_string"
}`;
