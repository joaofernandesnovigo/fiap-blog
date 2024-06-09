import { Link, useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import Card from "../components/Card";
import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";

function PostList(){

    const[categories, setCategories] = useState([]);
    const[posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getCategories = async () => {
        const response = await contentfulClient.getEntries({
            content_type: 'blogCategory', //qual a tabela?
        });

        setCategories(response.items);
    };

    const getPosts = async (page = 1) => {
        try {
            const limit = 2;
            const skip = (page - 1) * limit;

            //--se a promise for resolvida
            const response = await contentfulClient.getEntries({
                content_type: 'blogPost',
                limit: limit,
                skip: skip,
                order: '-sys.createdAt',
            });
            
            setPosts(response.items);
            setTotalPages(Math.ceil(response.total / limit));

            //console.log(response.items)
        } catch (error) {
            //se a promise for rejeitada
            console.log("Erro ao obter posts", error);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    

    useEffect(()=>{
        getCategories();
        getPosts(currentPage);
    }, [currentPage]);//disparada no onload do componente home

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="mb-3">Listagem dos posts</h2>

                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                        <span aria-hidden="true">&lt;</span>
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                        <span aria-hidden="true">&gt;</span>
                                    </button>
                                </li>
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {posts.map((item) => (
                            <Card 
                                key={item.sys.id}
                                title={item.fields.blogPostTitle}
                                text={item.fields.blogPostDescription}
                                link={'/post/' + item.fields.blogTextSlug}
                            />
                        ))}
                        
                        <Link to="/" className="btn btn-dark mt-4">Voltar para home</Link>
                    </main>

                    <aside className="col-md-4">
                        <h2>Categorias</h2>
                        <ul>
                            {categories.map( (item) => <li key={item.sys.id}>{item.fields.blogCategoryTitle}</li> )}
                        </ul>
                    </aside>
                </div>   
            </div>

            

        </Layout>
    );
}

export default PostList;