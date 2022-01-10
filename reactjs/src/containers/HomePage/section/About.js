import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <div className="title-content">Đây là video của tui</div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Bác sĩ Bích trông còn khá trẻ, khoảng hơn 30 tuổi mà thôi. Cô ấy
                có vóc dáng đầy đặn, nhưng vẫn rất gọn gàng và nhanh nhẹn. Để
                đảm bảo an toàn, cô Bích mặc bộ đồng phục trắng tinh của bệnh
                viện và đeo khẩu trang che kín cả khuôn mặt. Ngay cả mái tóc
                cũng được búi gọn trong chiếc mũ. Tuy không thể nhìn thấy khuôn
                mặt của cô, nhưng lắng nghe giọng nói dịu dàng, ấm áp em vẫn có
                thể chắc chắn rằng cô Bích rất xinh đẹp.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
