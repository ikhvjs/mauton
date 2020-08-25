import React , { Component } from 'react';
import { connect } from 'react-redux';
import { 
	requestTagAct,
	requestTagByClickAct,
	postTagAct,
	selectCreateTagAct,
	deleteTagAct,
	selectDeleteTagAct,
	selectSearchTagAct,
	searchTagAct,
	beforeUpdateTagAct,
	afterUpdateTagAct,
	updateTagAct,
	updateCancelTagAct,
	clearSearchTagAct
} from './TagConfigAction';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Form, Button, Col} from "react-bootstrap";
import './TagConfig.css'


const mapStateToProps = (state) => {
  return {
    tags: state.tagRdc.tags,
    beforeUpdateTag: state.tagRdc.beforeUpdateTag,
  	isRefreshTagNeeded:state.tagRdc.isRefreshTagNeeded
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onRequestTag: () => 
	    	dispatch(requestTagAct()),
		onCreateTag:(event) =>
			dispatch(postTagAct(selectCreateTagAct(event))),
		onRequestTagByClick:() =>
			dispatch(requestTagByClickAct()),
		onDeleteTag:(event) =>
			dispatch(deleteTagAct(selectDeleteTagAct(event))),
		onSearchTag:(event) =>
			dispatch(searchTagAct(selectSearchTagAct(event))),
		onSelectToUpdateTag:(event) => 
			dispatch(beforeUpdateTagAct(event)),
		onUpdateTag:(event) => 
			dispatch(updateTagAct(afterUpdateTagAct(event))),
		onCancelUpdateTag:(event) =>
			dispatch(updateCancelTagAct(event)),
		onClearSearchTag:(event) =>
			dispatch(clearSearchTagAct(event))

	}
}


class TagConfig extends Component  {

	componentDidMount() {
		this.props.onRequestTag();
	}

	componentDidUpdate(prevProps) {
		if (this.props.isRefreshTagNeeded === true) {
					this.props.onRequestTagByClick();
		}
	}


	render() {

		const { tags,
				onCreateTag,
				onDeleteTag,
				onSearchTag,
				onSelectToUpdateTag,
				onUpdateTag,
				onCancelUpdateTag,
				onClearSearchTag
			} = this.props;




		return (
			<React.Fragment>
			<h3>BLog Tag</h3>
			<br/>
			<Form.Row>
				<Col xs={3}>
					<Form.Control size="sm" name="tag_name"
						type="text" placeholder="Enter Tag Name" />
				</Col>
				<Col name='button' xs={0.3}>
					<Button size="sm" onClick={onSearchTag}>Search</Button>
				</Col>
				<Col name='button' xs={0.3}>
					<Button size="sm" variant="secondary" onClick={onClearSearchTag}>Clear</Button>
				</Col>
			</Form.Row>
			<br/>
			<Table striped  hover size="sm" className="tag-table">
			  <thead>
			    <tr>
			      <th width="50%">Tag Name</th>
			      <th width="20%">Seq</th>
			      <th width="10%">Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  <tr id='new'>
			      <td><Form.Control  size="sm" name="tag_name" 
			      	type="text" placeholder="Enter Category Name" /></td>
			      <td><Form.Control  size="sm" name="seq" 
			      	type="text" placeholder="Enter seq" /></td>
			      <td headers='button'>
			      	<Button name="create" onClick={onCreateTag} 
			      		variant="primary" size="sm">
			      		Create
			      	</Button>
			      </td>
			    </tr>
			  	{tags.map((tag)=>{
			  		return(
			  			<tr id={tag.tag_id} key={tag.tag_id}>
					      <td name='tag_name'>{tag.tag_name}</td>
					      <td name='seq'>{tag.seq}</td>
					      <td headers='button'>
					      	<Button variant="success" name="update"
					      	size="sm" onClick={onSelectToUpdateTag}>
					      		Update
					      	</Button>{" "}
							<Button variant="danger" name="delete"
							size="sm" onClick={onDeleteTag}>
								Delete
							</Button>{" "}
							<Button className="hidden-button" variant="primary" name="save"
							size="sm" onClick={onUpdateTag}>
								Save
							</Button>{" "}
							<Button className="hidden-button" variant="secondary" name="cancel"
							size="sm" onClick={onCancelUpdateTag}>
								Cancel
							</Button>
						  </td>
					    </tr>
			  		)})
			  	}
			  </tbody>
			</Table>
			</React.Fragment>
		);
	}


}

// export default CategoryConfig;
export default connect(mapStateToProps, mapDispatchToProps)(TagConfig)