import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';

class AdminModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
      title: this.props.infos.title,
      colors: this.props.infos.color,
      sizes: this.props.infos.size,
      qty: this.props.infos.qty,
      tags: this.props.infos.tags,
      images: this.props.infos.images,
      description: this.props.infos.description,
      price: this.props.infos.price
    };
  }

  toggle = () => this.setState({ modalEdit: !this.state.modalEdit });

  onSubmit = (id, title, price, qty, color, size, tags, images, description) => {
    axios.post('/api/update/item', {
      id,
      title,
      price,
      qty,
      color: (color.slice(0)+'').replace(/\s/g,'').split(','),
      size: size,
      tags: (tags.slice(0)+'').split(','),
      images: (images.slice(0)+'').replace(/\s/g,'').split(','),
      description
    })
    .then(response => {
      this.setState({ modalEdit: false });
      window.location.reload(true);
    })
    .then(() => {
      window.location.reload(true);
    })
    .catch(err => {
      console.log(err);
    });
  }

  onChangeTitle = (e) => this.setState({title: e.target.value})
  onChangePrice = (e) => this.setState({price: e.target.value})
  onChangeColor = (e) => this.setState({colors: e.target.value})
  onChangeSizes = (e) => this.setState({sizes: e.target.value})
  onChangeQty = (e) => this.setState({qty: e.target.value})
  onChangeTags = (e) => this.setState({tags: e.target.value})
  onChangeImages = (e) => this.setState({images: e.target.value})
  onChangeDescription = (e) => this.setState({description: e.target.value})


  render() {
    const { title, colors, qty, sizes, tags, images, description, price } = this.state
    const { _id } = this.props.infos

    return (
      <div>
        <Button outline color="primary" size='sm' onClick={this.toggle}><FiEdit /></Button>
        <Modal isOpen={this.state.modalEdit} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.infos.title} - (id: {_id})</ModalHeader>
          <ModalBody>  
            <ListGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.title} value={title} onChange={this.onChangeTitle} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Price Rs.</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.price} value={price} onChange={this.onChangePrice} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Colors</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.color.map(x=>' '+x)} value={colors} onChange={this.onChangeColor} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Sizes</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.size.value} value={sizes} onChange={this.onChangeSizes} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Stock</InputGroupText>
                </InputGroupAddon>
                <Input type="number" placeholder={"default: "+this.props.infos.qty} value={qty} onChange={this.onChangeQty} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Category</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.tags} value={tags} onChange={this.onChangeTags} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Images</InputGroupText>
                </InputGroupAddon>
                <Input type="textarea" placeholder={"default: "+this.props.infos.images.map(x=>x+' '+x)} value={images} onChange={this.onChangeImages} />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>description</InputGroupText>
                </InputGroupAddon>
                <Input type="textarea" placeholder={"default: "+this.props.infos.description} value={description} onChange={this.onChangeDescription} />
              </InputGroup>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" 
              onClick={()=>this.onSubmit(
                _id, 
                title, 
                price, 
                qty,
                colors, 
                sizes, 
                tags, 
                images, 
                description
                )}>Confirm the changes?
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default AdminModalUpdate;
