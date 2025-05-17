import "../../UI/privacy.scss";
function Privacy() {
  return (
    <>
      <h1 className="privacy__main">Privacy Policy</h1>
      <p className="privacy__content--main">
        Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và
        bảo vệ thông tin của bạn. Việc bảo vệ dữ liệu cá nhân của bạn là ưu tiên
        hàng đầu của chúng tôi.
      </p>
      <div className="privacy__box">
        <h2 className="privacy__title">1. Thông tin Chúng Tôi Thu Thập</h2>
        <p className="privacy__content">
          Chúng tôi thu thập nhiều loại thông tin khác nhau để cung cấp và cải
          thiện dịch vụ của chúng tôi, bao gồm:
        </p>
        <ul className="privacy__list">
          <li className="privacy__item">
            Thông tin cá nhân: tên, email, số điện thoại, thông tin đăng nhập.
          </li>
          <li className="privacy__item">
            Thông tin sử dụng: hành vi tương tác trên trang web, lượt truy cập,
            nội dung bạn quan tâm.
          </li>
          <li className="privacy__item">
            Cookies và công nghệ theo dõi để tối ưu hóa trải nghiệm người dùng.
          </li>
        </ul>
        <div className="privacy__box"></div>
        <h2>2. Mục đích Sử Dụng Thông Tin</h2>
        <p className="privacy__content">
          Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:
        </p>
        <ul className="privacy__list">
          <li className="privacy__item">
            Cung cấp, duy trì và cải thiện dịch vụ.
          </li>
          <li className="privacy__item">
            Cá nhân hóa trải nghiệm người dùng, cung cấp nội dung phù hợp.
          </li>
          <li className="privacy__item">
            Phân tích dữ liệu để hiểu nhu cầu của người dùng và phát triển sản
            phẩm.
          </li>
          <li className="privacy__item">
            Đảm bảo an toàn, bảo mật, phát hiện và ngăn chặn gian lận.
          </li>
        </ul>
      </div>

      <div className="privacy__box">
        <h2>3. Chia Sẻ Thông Tin</h2>
        <p className="privacy__content">
          Chúng tôi không bán thông tin cá nhân của bạn. Tuy nhiên, trong một số
          trường hợp nhất định, chúng tôi có thể chia sẻ thông tin với:
        </p>
        <ul className="privacy__list">
          <li className="privacy__item">
            Đối tác hỗ trợ kỹ thuật và dịch vụ thanh toán.
          </li>
          <li className="privacy__item">
            Nhà cung cấp bên thứ ba để cải thiện trải nghiệm người dùng.
          </li>
          <li className="privacy__item">
            Cơ quan pháp luật nếu có yêu cầu hợp pháp.
          </li>
        </ul>
      </div>

      <div className="privacy__box">
        <h2>4. Bảo Mật Dữ Liệu</h2>
        <p className="privacy__content">
          Chúng tôi thực hiện các biện pháp bảo vệ dữ liệu như mã hóa thông tin,
          kiểm soát truy cập và giám sát hệ thống để ngăn chặn vi phạm bảo mật.
        </p>
      </div>

      <div className="privacy__box">
        <h2>5. Quyền của Người Dùng</h2>
        <p className="privacy__content">Bạn có quyền:</p>
        <ul className="privacy__list">
          <li className="privacy__item">
            Truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình.
          </li>
          <li className="privacy__item">
            Yêu cầu không nhận email quảng cáo hoặc thông báo không cần thiết.
          </li>
          <li className="privacy__item">
            Từ chối việc sử dụng cookies hoặc công nghệ theo dõi.
          </li>
        </ul>
      </div>

      <div className="privacy__box">
        <h2>6. Lưu Trữ Dữ Liệu</h2>
        <p className="privacy__content">
          Chúng tôi lưu trữ dữ liệu của bạn trong khoảng thời gian cần thiết để
          cung cấp dịch vụ, tuân thủ quy định pháp luật và bảo vệ quyền lợi của
          chúng tôi.
        </p>
      </div>

      <div className="privacy__box">
        <h2>7. Thay đổi Chính sách</h2>
        <p className="privacy__content">
          Chính sách bảo mật có thể thay đổi theo thời gian. Người dùng sẽ được
          thông báo nếu có cập nhật quan trọng.
        </p>
      </div>


    </>
  );
}

export default Privacy;
