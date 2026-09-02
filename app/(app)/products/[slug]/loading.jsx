import "./loading.scss";

export default function Loading() {
    return (
        <div className="ps-page ps-page--product">
            <div className="container">
                <div className="pd-skeleton row">
                    <div className="col-12 col-md-5">
                        <div className="pd-skeleton__bar pd-skeleton__main-image" />
                        <div className="pd-skeleton__thumbs">
                            <div className="pd-skeleton__bar pd-skeleton__thumb" />
                            <div className="pd-skeleton__bar pd-skeleton__thumb" />
                            <div className="pd-skeleton__bar pd-skeleton__thumb" />
                            <div className="pd-skeleton__bar pd-skeleton__thumb" />
                        </div>
                    </div>

                    <div className="col-12 col-md-7 pd-skeleton__info">
                        <div className="pd-skeleton__bar pd-skeleton__title" />
                        <div className="pd-skeleton__bar pd-skeleton__meta" />
                        <div className="pd-skeleton__bar pd-skeleton__price" />

                        <div className="pd-skeleton__bar pd-skeleton__line" />
                        <div className="pd-skeleton__bar pd-skeleton__line" />
                        <div className="pd-skeleton__bar pd-skeleton__line" />
                        <div className="pd-skeleton__bar pd-skeleton__line" />
                        <div className="pd-skeleton__bar pd-skeleton__line" />

                        <div className="pd-skeleton__bar pd-skeleton__button" />
                    </div>
                </div>
            </div>
        </div>
    );
}
