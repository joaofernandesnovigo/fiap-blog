import { Link, useParams} from "react-router-dom";
import {useEffect, useState} from 'react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import Layout from "../components/Layout";

import { contentfulClient } from "../utils/createContentfulClient";


function Post () {

    const {slug} = useParams();
    const[post, setPost] = useState(null);

    const getPost = async() => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: 'blogPost',
                'fields.blogTextSlug': slug,
            });

            console.log(response.items);
            setPost(response.items[0] || null); //se o item do array não existe, assume null como valor
            
        } catch (error) {
            setPost(null);
        }
    };

    useEffect(()=>{
        getPost();
    }, []);//disparada no onload do componente home

    return (
        <Layout>
            <main className="container">
                <div className="row">
                    <div className="col">
                        {!post && <div>Carregando ...</div>}

                        {post && (
                                <>
                                    <h1>{post.fields.blogPostTItle}</h1>
                                    <div dangerouslySetInnerHTML={{__html:documentToHtmlString(post.fields.blogPostContent)}}>
                                        
                                    </div>
                                    <Link to="/" className="btn btn-primary mt-4">Voltar para Home</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Post;