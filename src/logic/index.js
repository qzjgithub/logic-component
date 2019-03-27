// import 'antd/lib/date-picker/style/index.css';
// import 'antd/lib/input/style/index.css';
// import './component/default/ASSETS/font/iconfont.css';
import './component/default/ASSETS/common.styl';

module.exports.Button = require('./component/default/button').default;
module.exports.Grid = require('./component/default/grid').default;
module.exports.Input = require('./component/default/input').default;
module.exports.Checkbox = require('./component/default/checkbox').default;
module.exports.Select = require('./component/default/select').default;
module.exports.TopSlip = require('./component/default/topSlip').default;
module.exports.Tree = require('./component/default/tree').default;
module.exports.TreeItem = require('./component/default/treeItem').default;
module.exports.Cutover = require('./component/default/cutover').default;
module.exports.Dialog = require('./component/default/dialog').default;
module.exports.Icon = require('./component/default/icon').default;
module.exports.Loading = require('./component/default/loading').default;
module.exports.Menu = require('./component/default/menu').default;
module.exports.Form = require('./component/default/form').default;
module.exports.Timer = require('./component/default/timer').default;
module.exports.Calendar = require('./component/default/calendar').default;
module.exports.Datepicker = require('./component/default/datepicker').default;
module.exports.DateRangepicker = require('./component/default/dateRangepicker').default;
module.exports.TreeSelect = require('./component/default/treeSelect').default;
module.exports.Pagination = require('./component/default/pagination').default;

const Status = require('./common/Status').default;
const Motivation = require('./common/Motivation').default;
const GenLogic = require('./common/GenLogic').default;
const logical = require('./common/logical').default;
const Util = require('./common/Util');
const NestedEvent = require('./common/NestedEvent');
const SequenceEvent = require('./common/SequenceEvent');
const Logic = {
    Status,
    Motivation,
    GenLogic,
    logical,
    NestedEvent,
    SequenceEvent,
    Util
};

module.exports.Logic = Logic;