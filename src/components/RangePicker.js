import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const DateSelector = ({ onChange }) => {
  return (
    <div className="rangepicker">
      <RangePicker format={dateFormat} bordered={false} onChange={onChange} />
    </div>
  );
};

export default DateSelector;
