import { Layout } from "../../components/layout/Layout";
import { Row, Col, Table, Spinner } from "reactstrap";
import axios from "axios";
import { DetailsData } from "../../components/details/DetailsData";
import { useEffect, useState } from "react";

export const Details = () => {
    let initialState = {
        data: undefined,
        error: undefined,
        loading: true,
    };
    const [datas, setDatas] = useState(initialState);
    useEffect(() => {
        setDatas((oldData) => ({
            ...oldData,
            loading: true,
            error: undefined,
            data: undefined,
        }));

        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(({ data }) => {
                setDatas((oldData) => ({
                    ...oldData,
                    data: data,
                    loading: false,
                    error: undefined,
                }));
            })
            .catch((err) => {
                setDatas({ data: undefined, loading: false, error: err.toString() });
            });
    }, []);
    console.log(datas);
    return (
        <Layout>
            <Row>
                <Col>
                    <div>
                        {datas.error && <h5 color="red">Error occured ....</h5>}
                        {datas.loading && <Spinner />}
                        {datas.data && (
                            <Table dark>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Company Name</th>
                                        <th>See posts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datas.data &&
                                        <DetailsData data={datas.data} />
                                    }
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};