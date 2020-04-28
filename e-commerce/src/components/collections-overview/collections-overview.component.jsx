import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import PreviewCollection from '../../components/preview-collection/preview-collection.component';
import {selectCollectionsForPreview} from "../../redux/shop/shop.selector";

import "./collections-overview.styles.scss";

const CollectionsOverview = ({collections}) => (
    <div className='collections-overiew'>
        {
                collections.map(collection => (
                    <PreviewCollection key={collection.id} {...collection}/>
                ))
            }
    </div>
);


const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});


export default connect(mapStateToProps)(CollectionsOverview);