import Table from 'react-bootstrap/Table'
import React from 'react';
export default class TableRender extends React.Component {
 
    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    componentDidMount() {
        this.getRowsData();
    }

    componentDidUpdate() {
        this.getRowsData();
    }
    
    getKeys = function(){
        return Object.keys(this.props.data[0]);
    }
    
    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
        })
    }
    
    getRowsData = function(){
        this.props.postings.map((item) => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>{item.view}</td>
                    <td>{item.timestamp}</td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Table striped bordered hover>
            <thead>
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Contents</th>
                <th>View</th>
                <th>Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {this.props.postings.map((item, index) => {
                return (
                    <tr key={"post-row-data" + index}>
                        <td key={"post-data-id" + index}>{item.id}</td>
                        <td key={"post-data-title" + index}>{item.title}</td>
                        <td key={"post-data-content" + index}>{item.content}</td>
                        <td key={"post-data-view" + index}>{item.view}</td>
                        <td key={"post-data-timestamp" + index}>{item.timestamp}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
        
        );
    }
}