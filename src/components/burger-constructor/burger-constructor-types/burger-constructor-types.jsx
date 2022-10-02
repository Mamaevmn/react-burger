import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabPropTypes } from '../../../utils/const';

function Tabs(props) {
  const [current, setCurrent] = React.useState(props.tabs[0].text);

  return (
    <div style={{ display: 'flex' }}>
      {props.tabs.map((curr_tab, idx) => 
        <Tab key={idx} value={curr_tab.text} active={current === curr_tab.text} onClick={setCurrent}>
          {curr_tab.text}
        </Tab>
      )}
    </div>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(tabPropTypes),
}

export default Tabs