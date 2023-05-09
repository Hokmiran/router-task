import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import { Row, Col, Spinner, Card, CardHeader, CardBody, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";


const UsersPosts = () => {
  let initialState = {
    data: undefined,
    error: undefined,
    loading: true,
  };
  const [posts, setPosts] = useState(initialState);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
    getUserPost();
  }
  useEffect(() => {
    getUserPost();
  }, [id]);



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
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
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
                        <button className="btn btn-secondary">
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