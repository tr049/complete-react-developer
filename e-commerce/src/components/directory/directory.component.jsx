import React from 'react';
import {connect} from "react-redux";
import MenuItem from '../menu-item/menu-item.component';
import {selectDirectorySelections} from "../../redux/directory/directory.selectors";
import {createStructuredSelector} from "reselect";
import "./directory.styles.scss";

const Directory = ({sections}) => {

  return (
      <div className="directory-menu">
          {
            sections.map(({id, ...otherProps}) => {
                  return <MenuItem key={id} {...otherProps}/>
              })
          }
      </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySelections
})

export default connect(mapStateToProps)(Directory);