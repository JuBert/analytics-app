import { Radio } from 'antd';
import 'antd/dist/antd.css';

const RadioButtons = ({ value, onChange }) => {
  return (
    <div className="flex-center">
      <Radio.Group value={value} onChange={onChange}>
        <Radio.Button value="confirmed">New cases</Radio.Button>
        <Radio.Button value="deaths">Deaths</Radio.Button>
        <Radio.Button value="recovered">Recovered</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default RadioButtons;
