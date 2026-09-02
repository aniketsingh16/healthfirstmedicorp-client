import React from "react";
import ModuleArticleComments from "@/components/elements/articles/modules/ModuleArticleComments";
import Rating from "@/components/elements/Rating";
import Link from "next/link";
import usePost from "@/hooks/usePost";

const ArticleDetailFullwidth = ({ post }) => {
    const { thumbnail, title, categories, createdBy, initPost } = usePost();
    return (
        <div className="ps-post ps-post--detail ps-post--detail-fullwidth">
            <div className="ps-post__header">
                <div className="ps-post__categories">{categories}</div>
                <div className="ps-post__meta">
                    <span className="ps-post__created-at">{createdBy}</span>
                    <Link href="/blog" legacyBehavior>
                        <a className="ps-post__author">Alfredo Austin</a>
                    </Link>
                </div>
                <h1 className="ps-post__title">{post.name}</h1>
            </div>

            <div className="ps-blog__banner">
                <img src="/static/img/blog/blog13-992x525.jpg" alt="" />
            </div>
            <div className="ps-post__wrapper">
                <p className="ps-blog__text-large">
                    Sed ac ligula ut leo dignissim blandit non at odio. Mauris
                    et odio ut odio elementum fermentum. Nullam dictum diam
                    nisl, vitae euismod erat imperdiet in. Vestibulum ac
                    tristique tortor, non iaculis dolor. Nunc in tincidunt dui.
                    Proin laoreet imperdiet dui et imperdiet. Nam sit amet erat
                    nisl. Nam tristique porttitor risus, at fringilla velit.
                    Aliquam erat volutpat.
                </p>
                <p className="ps-blog__text">
                    Suspendisse viverra egestas eros. Duis tempus varius diam et
                    condimentum. Donec elementum, mi ut posuere posuere, erat
                    dui interdum ante, nec fringilla augue odio ac felis. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse quam mauris, tempus ut felis nec, rutrum cursus
                    arcu. Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Pellentesque id sodales elit. Quisque et dui
                    vulputate, rutrum nunc a, ullamcorper tortor. Duis at libero
                    vestibulum, aliquet diam a, pharetra mauris. Donec justo
                    libero, suscipit eu dolor scelerisque, eleifend rhoncus
                    quam. Nullam aliquet semper magna, commodo tincidunt risus
                    varius tincidunt. Integer pulvinar ac libero non vulputate.
                </p>
                <p className="ps-blog__text">
                    Vivamus et felis vitae dolor imperdiet pulvinar id eu dui.
                    Donec ultrices sem nisl, ut porttitor purus scelerisque vel.
                    Morbi eget lacinia ligula, eu condimentum urna. Maecenas id
                    nisi a ex sollicitudin commodo. Duis imperdiet libero eget
                    nibh volutpat, in iaculis felis varius. Nullam ullamcorper
                    bibendum eros quis congue. Donec aliquam vel lorem vel
                    tincidunt. Nulla nulla augue, pulvinar sit amet faucibus ut,
                    lobortis ut diam. Proin blandit scelerisque odio ac
                    consectetur. Nulla a risus fermentum, auctor mauris vitae,
                    aliquet arcu.
                </p>
            </div>

            <div className="row ps-blog__row">
                <div className="col-12 col-md-6">
                    <img
                        className="ps-blog__image"
                        src="/static/img/blog-detail-image.jpg"
                        alt=""
                    />
                </div>
                <div className="col-12 col-md-6">
                    <p className="ps-blog__text-large">
                        Proin laoreet imperdiet dui et imperdiet. Nam sit amet
                        erat nisl. Nam tristique porttitor risus, at fringilla
                        velit. Aliquam erat volutpat.
                    </p>
                    <p className="ps-blog__text">
                        Pellentesque id sodales elit. Quisque et dui vulputate,
                        rutrum nunc a, ullamcorper tortor. Duis at libero
                        vestibulum, aliquet diam a, pharetra mauris. Donec justo
                        libero, suscipit eu dolor scelerisque, eleifend rhoncus
                        quam. Nullam aliquet semper magna, commodo tincidunt
                        risus varius tincidunt. Integer pulvinar ac libero non
                        vulputate.
                    </p>
                    <p className="ps-blog__text">
                        Donec tristique dui lectus, facilisis euismod diam
                        faucibus condimentum. Integer venenatis pellentesque
                        pretium.
                    </p>
                </div>
            </div>
            <div className="ps-post__wrapper">
                <p className="ps-blog__text">
                    Vivamus et felis vitae dolor imperdiet pulvinar id eu dui.
                    Donec ultrices sem nisl, ut porttitor purus scelerisque vel.
                    Morbi eget lacinia ligula, eu condimentum urna. Maecenas id
                    nisi a ex sollicitudin commodo. Duis imperdiet libero eget
                    nibh volutpat, in iaculis felis varius. Nullam ullamcorper
                    bibendum eros quis congue. Donec aliquam vel lorem vel
                    tincidunt. Nulla nulla augue, pulvinar sit amet faucibus ut,
                    lobortis ut diam. Proin blandit scelerisque odio ac
                    consectetur. Nulla a risus fermentum, auctor mauris vitae,
                    aliquet arcu.
                </p>
            </div>
            <div className="row ps-blog__row">
                <div className="col-12 col-md-6">
                    <div className="ps-review">
                        <div className="ps-review__text">
                            There was a small mistake in the order. In return, I
                            got the correct order and I could keep the wrong one
                            for myself.
                        </div>
                        <div className="ps-review__name">Esther Howard</div>
                        <div className="ps-review__review">
                            <Rating />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="ps-review">
                        <div className="ps-review__text">
                            I ordered on Friday evening and on Monday at 12:30
                            the package was with me. I have never encountered
                            such a fast order processing.
                        </div>
                        <div className="ps-review__name">Albert Flores</div>
                        <div className="ps-review__review">
                            <Rating />
                        </div>
                    </div>
                </div>
            </div>
            <div className="ps-post__wrapper">
                <p className="ps-blog__text-large">
                    Sed ac ligula ut leo dignissim blandit non at odio. Mauris
                    et odio ut odio elementum fermentum. Nullam dictum diam
                    nisl, vitae euismod erat imperdiet in. Vestibulum ac
                    tristique tortor, non iaculis dolor. Nunc in tincidunt dui.
                    Proin laoreet imperdiet dui et imperdiet. Nam sit amet erat
                    nisl. Nam tristique porttitor risus, at fringilla velit.
                    Aliquam erat volutpat.
                </p>
                <p className="ps-blog__text">
                    Vivamus et felis vitae dolor imperdiet pulvinar id eu dui.
                    Donec ultrices sem nisl, ut porttitor purus scelerisque vel.
                    Morbi eget lacinia ligula, eu condimentum urna. Maecenas id
                    nisi a ex sollicitudin commodo. Duis imperdiet libero eget
                    nibh volutpat, in iaculis felis varius. Nullam ullamcorper
                    bibendum eros quis congue. Donec aliquam vel lorem vel
                    tincidunt. Nulla nulla augue, pulvinar sit amet faucibus ut,
                    lobortis ut diam. Proin blandit scelerisque odio ac
                    consectetur. Nulla a risus fermentum, auctor mauris vitae,
                    aliquet arcu.
                </p>

                <p className="ps-blog__text">
                    Vivamus et felis vitae dolor imperdiet pulvinar id eu dui.
                    Donec ultrices sem nisl, ut porttitor purus scelerisque vel.
                    Morbi eget lacinia ligula, eu condimentum urna. Maecenas id
                    nisi a ex sollicitudin commodo. Duis imperdiet libero eget
                    nibh volutpat, in iaculis felis varius. Nullam ullamcorper
                    bibendum eros quis congue. Donec aliquam vel lorem vel
                    tincidunt. Nulla nulla augue, pulvinar sit amet faucibus ut,
                    lobortis ut diam. Proin blandit scelerisque odio ac
                    consectetur. Nulla a risus fermentum, auctor mauris vitae,
                    aliquet arcu.
                </p>
            </div>
        </div>
    );
};

export default ArticleDetailFullwidth;
