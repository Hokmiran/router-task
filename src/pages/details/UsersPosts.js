import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Row, Col, Spinner, Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const UsersPosts = () => {
  const [newPost, setNewpost] = useState({
    username: "",
    title: "",
    body: ""
  });

  const [editData, setEditData] = useState({
    title: '',
    body: ''
  })

  const [editId, setEditId] = useState(null)
  const [posts, setPosts] = useState({
    data: undefined,
    error: undefined,
    loading: true,
  });

  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const toggle = () => setModal(!modal);
  const editToggle = () => setEditModal(!editModal);

  const getUserPost = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(({ data }) => {
        setPosts((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setPosts({ data: undefined, loading: false, error: err.toString() });
      });
  }

  const deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        getUserPost();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then(({ data }) => {
        const maxId = posts.data.reduce((max, product) => {
          if (product.id > max) max = product.id
          return max;
        }, 0)
        console.log(maxId);
        setPosts((oldData) => ({
          ...oldData,
          data: [...oldData.data, { data, id: maxId + 1 }],
        }));
        setNewpost({ title: "", body: "" });
        getUserPost();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewpost(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  }
  useEffect(() => {
    getUserPost();
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/posts/${editId}`, editData)
      .then(res => {
        getUserPost()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const changeEditData = (name, value) => {
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))

  }
  const getEditData = (id) => {
    editToggle()
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(({ data }) => {
        setEditData({ title: data.title, body: data.body })
        setEditId(id)
      })
  }


  return (
    <Layout>
      {posts.loading && <Spinner />}
      {posts.error && <h4 className="text-danger">Unexpected error occured</h4>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <div>
          <button onClick={toggle} className="btn btn-success">
            Create
          </button>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="exampleTitle">Username</Label>
              <Input value={newPost.username} onChange={(e) => handleChange(e)} type="text" name="username" id="exampleUsername" placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleTitle">Title</Label>
              <Input value={newPost.title} onChange={(e) => handleChange(e)} type="text" name="title" id="exampleTitle" placeholder="Title" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Body</Label>
              <Input value={newPost.body} onChange={(e) => handleChange(e)} type="textarea" name="body" id="exampleBody" placeholder="Body" />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button type='submit' color="primary" onClick={toggle}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>



      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Modal title</ModalHeader>
        <Form onSubmit={handleEdit}>
          <ModalBody>
            <FormGroup>
              <Label for="exampleTitle">Title</Label>
              <Input type="text" name="title" id="exampleTitle" placeholder="Title" value={editData.title} onChange={(e) => changeEditData('title', e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Body</Label>
              <Input type="textarea" name="body" id="exampleBody" placeholder="Body" cols="5" value={editData.body} onChange={(e) => changeEditData('body', e.target.value)} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button type='submit' color="primary" onClick={editToggle}>
              Submit
            </Button>
            <Button color="secondary" onClick={editToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {posts?.data &&
        <Row>
          <Col ms={12}>
            {posts.data?.map(({ id, title, body }) => (
              <Card key={id} className="mt-3">
                <CardHeader>{title}</CardHeader>
                <CardBody>{body}
                  <CardFooter >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <div style={{ marginRight: 10 }}>
                        <button onClick={() => getEditData(id)} className="btn btn-secondary">
                          <AiFillEdit />
                        </button>
                      </div>
                      <div>
                        <button onClick={() => deletePost(id)} className="btn btn-danger">
                          <BsFillTrashFill />
                        </button>
                      </div>
                    </div>
                  </CardFooter>
                </CardBody>
              </Card>

            ))}
          </Col>
        </Row>
      }
    </Layout>
  );
};

export default UsersPosts;