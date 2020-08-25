import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import React, {useState} from 'react'

export default class newPostModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            id: null,
            title: "",
            content: "",
        }
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave() {
        this.setState({show: false})
        var result = fetch('https://localhost:44345/Postings', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "id": this.state.id,
                "title": this.state.title,
                "content": this.state.content,
            })
        })
        .then((res) => { this.props.updateList(res) })
        .catch(function(res){ console.log(res) });
    }

    render() {
        return (
            <div>
              <Button variant="primary" onClick={(e) => {this.setState({show: true})}}>
                New Post
              </Button>
        
              <Modal show={this.state.show} onHide={(e) => {this.setState({show: false})}}>
                  <Modal.Header closeButton>
                      <Modal.Title>Create a new Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                      <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3">
                              ID
                          </InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={(e) => this.setState({id: e.target.value})}/>
                      </InputGroup>
      
                      <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                          <InputGroup.Text id="basic-addon3">
                              Title
                          </InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl id="basic-url" aria-describedby="basic-addon3" onChange={(e) => this.setState({title: e.target.value})}/>
                      </InputGroup>
      
                      <InputGroup>
                          <InputGroup.Prepend>
                          <InputGroup.Text>With textarea</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl as="textarea" aria-label="With textarea" onChange={(e) => this.setState({content: e.target.value})}/>
                      </InputGroup>
      
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={(e) => {this.setState({show: false})}}>
                      Close
                      </Button>
                      <Button variant="primary" onClick={this.handleSave}>
                      Save Changes
                      </Button>
                  </Modal.Footer>
                  </Modal>
              </div>
          );
    }
}
  