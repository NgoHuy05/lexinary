import "../../UI/Method.scss";
import vocaImg from "../../assets/images/tu-vung-theo-hinh-anh.jpg";
import minimapImg from "../../assets/images/mindmap-hoc-tieng-anh.jpeg";
import flashcardImg from "../../assets/images/flashcard-tieng-anh.png";
import gameImg from "../../assets/images/game-tieng-anh.png";
import SRSImg from "../../assets/images/lap-lai-ngat-quang.jpg";
import MusicImg from "../../assets/images/hoc-tieng-anh-qua-bai-hat-va-phim-anh0a6.jpg";
function Method() {
  return (
    <>
      <div className="method__main">HỌC TIẾNG ANH KHÔNG CÒN LÀ NỖI LO</div>

      <h3 className="method__title">1. Những phương pháp học từ vựng Tiếng Anh hiệu quả</h3>

      <div className="method__content--main">
        Học từ vựng là một trong những yếu tố quan trọng để nâng cao khả năng
        Tiếng Anh. Dưới đây là một số phương pháp học từ vựng hiệu quả:
      </div>



      <ul>
        <li className="method__item">
          <strong className="method__item--strong">1.1 Học từ vựng qua hình ảnh:</strong>
          <div className="method__content">
            Sử dụng hình ảnh để liên kết với từ vựng giúp bạn ghi nhớ từ lâu
            hơn. Ví dụ, khi học từ "apple" (quả táo), bạn có thể gắn kết nó với
            hình ảnh của một quả táo đỏ mọng. Các ứng dụng như Quizlet, Anki hay
            Memrise có thể giúp bạn học từ vựng thông qua hình ảnh một cách hiệu
            quả.
          </div>
          <img className="method__img" src={vocaImg} alt="tu-vung-theo-hinh-anh" />
        </li>
        <li className="method__item">
          <strong className="method__item--strong">1.2 Học từ vựng theo chủ đề, sơ đồ tư duy:</strong>

          <div className="method__content">
            Học từ vựng theo chủ đề giúp bạn dễ dàng ghi nhớ và ứng dụng từ
            vào các tình huống thực tế. Ví dụ, khi học về chủ đề "Du lịch"
            (Travel), bạn có thể nhóm các từ như "passport" (hộ chiếu), "flight"
            (chuyến bay), "hotel" (khách sạn). Sơ đồ tư duy (mind map) giúp bạn
            hệ thống hóa từ vựng một cách logic, dễ nhớ hơn.
          </div>
          <img className="method__img" src={minimapImg} alt="minimapImg" />
        </li>
        <li className="method__item">
          <strong className="method__item--strong">1.3 Học từ vựng từ các thẻ flashcard:</strong>

          <div className="method__content">
            Flashcard là một phương pháp hiệu quả để ôn tập từ vựng mỗi ngày.
            Bạn có thể viết từ vựng ở một mặt, mặt còn lại là nghĩa hoặc hình
            ảnh minh họa. Việc xem lại flashcard theo định kỳ giúp bạn ghi nhớ
            từ lâu hơn. Một số ứng dụng hỗ trợ học flashcard như Anki, Tinycards
            hay Quizlet.
          </div>
          <img className="method__img" src={flashcardImg} alt="flashcardImg" />
        </li>
        <li className="method__item">
          <strong className="method__item--strong">1.4 Học từ vựng qua game:</strong>
          <div className="method__content">
            Chơi game giúp việc học từ vựng trở nên thú vị và không nhàm chán.
            Các trò chơi như Scrabble, Word Connect, Duolingo hay Kahoot giúp
            bạn vừa học vừa giải trí. Ngoài ra, bạn có thể tham gia các game
            nhập vai (RPG) bằng Tiếng Anh để tiếp xúc với từ vựng trong ngữ cảnh
            thực tế. Một số game học từ vựng có thể kết hợp hình ảnh, âm thanh
            và phản xạ nhanh, giúp bạn ghi nhớ từ vựng tốt hơn.
          </div>
          <img className="method__img" src={gameImg} alt="gameImg" />
        </li>
        <li className="method__item">
          <strong className="method__item--strong">1.5 Học từ vựng qua bài hát & phim:</strong>

          <div className="method__content">
            Nghe nhạc hoặc xem phim có phụ đề Tiếng Anh là cách học tự nhiên
            và thú vị. Khi nghe bài hát, hãy chú ý đến lời bài hát, tra cứu
            nghĩa của từ mới và lặp lại chúng nhiều lần. Với phim ảnh, bạn có
            thể xem trước với phụ đề Tiếng Việt, sau đó chuyển sang phụ đề Tiếng
            Anh, rồi cuối cùng xem không có phụ đề để cải thiện khả năng nghe và
            nhớ từ vựng.
          </div>
          <img className="method__img" src={MusicImg} alt="MusicImg" />
        </li>


        <li className="method__item">
          <strong className="method__item--strong">1.6 Lặp lại từ nhiều lần:</strong>

          <div className="method__content">
            Việc ôn tập từ vựng theo chu kỳ là rất quan trọng. Bạn có thể áp
            dụng phương pháp lặp lại cách quãng (Spaced Repetition System -
            SRS), nghĩa là ôn lại từ sau 1 ngày, 3 ngày, 1 tuần, 1 tháng… để đảm
            bảo từ vựng không bị quên. Ngoài ra, bạn có thể ghi chép từ mới vào
            sổ tay và ôn lại mỗi ngày.
          </div>
          <img className="method__img" src={SRSImg} alt="SRSImg" />

        </li>
      </ul>

      <h3 className="method__title">2. Các cách học ngữ pháp Tiếng Anh đơn giản</h3>
      <div className="method__content--main">
        <p>Ngữ pháp là một phần quan trọng khi học Tiếng Anh. Dưới đây là các
          cách học ngữ pháp đơn giản và hiệu quả:</p><br />
      </div>

      <ul>
        <li className="method__item">
          <strong className="method__item--strong">2.1 Học theo từng thành phần trong câu:</strong>
          <div className="method__content">
            <p>Học ngữ pháp từ những phần cơ bản như chủ ngữ, vị ngữ, tân ngữ
              giúp bạn hiểu rõ cấu trúc câu. Ví dụ, khi học về thì hiện tại đơn
              (Present Simple), bạn cần hiểu rõ cách sử dụng động từ với các chủ
              ngữ khác nhau. Hãy tập phân tích câu đơn giản trước khi chuyển sang
              câu phức tạp.</p>

            <p>- Khi học một thì mới, hãy chia các động từ theo từng ngôi để nhớ cách sử dụng đúng.</p>
            <p>- Đọc và phân tích các đoạn văn ngắn, xác định thành phần câu trong đó.</p>
            <p>- Luyện viết câu theo mẫu để quen với cấu trúc.</p>

            <p>Ví dụ:</p>
            <p>- She always <strong>goes</strong> to school on time. (Cô ấy luôn đi học đúng giờ.)</p>
            <p>- They <strong>play</strong> football every Saturday. (Họ chơi bóng đá vào mỗi thứ Bảy.)</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">2.2 Chú ý các lỗi thường mắc phải:</strong>
          <div className="method__content">
            <p>Tránh các lỗi phổ biến như sai thì, sai chủ ngữ - động từ, quên
              thêm “s” với động từ số ít trong thì hiện tại đơn, hoặc dùng sai
              giới từ. Một cách hữu ích là ghi chú lại các lỗi thường gặp khi làm
              bài tập để rút kinh nghiệm và sửa sai.</p>

            <p>- Ghi chép lại các lỗi sai khi làm bài tập và sửa ngay sau khi phát hiện.</p>
            <p>- So sánh các lỗi của mình với ví dụ đúng để hiểu bản chất sai lầm.</p>
            <p>- Luyện tập với các bài tập trắc nghiệm để kiểm tra và khắc phục lỗi sai.</p>

            <p>Ví dụ:</p>
            <p>- <strong>Sai:</strong> She go to school every day.</p>
            <p>- <strong>Đúng:</strong> She <strong>goes</strong> to school every day.</p>
            <p>- <strong>Sai:</strong> He don’t like coffee.</p>
            <p>- <strong>Đúng:</strong> He <strong>doesn’t</strong> like coffee.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">2.3 Thực hành ngữ pháp thường xuyên:</strong>
          <div className="method__content">
            <p>Luyện tập qua bài tập ngữ pháp giúp bạn nắm vững lý thuyết. Bạn có
              thể sử dụng các trang web như Grammarly, Cambridge Grammar hoặc sách
              bài tập để kiểm tra và củng cố kiến thức của mình. Ngoài ra, việc
              viết nhật ký bằng Tiếng Anh mỗi ngày cũng giúp cải thiện ngữ pháp
              một cách tự nhiên.</p>

            <p>- Làm bài tập với mức độ khó tăng dần, từ cơ bản đến nâng cao.</p>
            <p>- Viết câu chuyện ngắn bằng tiếng Anh và tự kiểm tra ngữ pháp.</p>
            <p>- Tham gia các diễn đàn học ngữ pháp để thực hành và nhận phản hồi.</p>

            <p>Ví dụ bài luyện tập:</p>
            <p>- Điền từ đúng vào câu:</p>
            <p>  - She ___ (go/goes) to the market every morning. (<strong>goes</strong>)</p>
            <p>  - They ___ (is/are) playing football now. (<strong>are</strong>)</p>
          </div>
        </li>
      </ul>


      <h3 className="method__title">3. Phương pháp học Tiếng Anh giao tiếp tại nhà</h3>
      <div className="method__content--main">
        <p>Để học Tiếng Anh giao tiếp hiệu quả tại nhà, bạn cần thực hiện những
          phương pháp sau:</p>
      </div>

      <ul>
        <li className="method__item">
          <strong className="method__item--strong">3.1 Vượt qua nỗi sợ tâm lý và kiên trì đến cùng:</strong>
          <div className="method__content">
            <p>- Đừng lo sợ khi nói, hãy thực hành và kiên trì. Hầu hết người học
              đều e ngại mắc lỗi, nhưng sai sót là một phần của quá trình học. Hãy
              luyện tập nói trước gương, ghi âm lại để kiểm tra cách phát âm và
              ngữ điệu của mình, hoặc tìm bạn bè để luyện tập.</p>
            <p>- Một mẹo nhỏ là tự đặt câu với các từ vựng mới học và tự nói thành câu hoàn chỉnh. Việc lặp lại nhiều lần giúp bạn quen với cách diễn đạt và dần dần loại bỏ nỗi sợ hãi khi nói.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">3.2 Chuẩn bị vốn “từ vựng” vững chắc:</strong>
          <div className="method__content">
            <p>- Từ vựng là yếu tố then chốt giúp bạn giao tiếp tự tin. Học từ vựng
              theo tình huống thực tế như đi chợ, đặt hàng, hỏi đường… giúp bạn dễ
              dàng ứng dụng ngay. Hãy sử dụng sổ tay từ vựng hoặc ứng dụng như
              Anki, Quizlet để ôn tập hàng ngày.</p>
            <p>- Bạn cũng có thể áp dụng phương pháp "Spaced Repetition" – lặp lại cách quãng để giúp trí nhớ lưu giữ từ vựng lâu hơn. Hãy ghi từ vựng lên giấy nhớ và dán quanh nhà để luôn nhìn thấy và nhớ lâu hơn.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">3.3 Thay đổi cách học ngữ pháp theo kiểu truyền thống:</strong>
          <div className="method__content">
            <p>- Hãy học ngữ pháp qua giao tiếp và bài học thực tế thay vì học
              thuộc lòng. Khi nói chuyện, thay vì nghĩ về quy tắc ngữ pháp, hãy
              chú ý đến các mẫu câu thông dụng và cách người bản xứ sử dụng chúng.
              Xem các cuộc hội thoại thực tế trong phim hoặc podcast để học cách
              sử dụng ngữ pháp linh hoạt.</p>
            <p>- Ví dụ, khi học thì hiện tại hoàn thành, thay vì chỉ học lý thuyết, hãy đặt câu hỏi như "Have you ever traveled abroad?" rồi tự trả lời và thực hành nhiều lần.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">3.4 Luyện phát âm chuẩn và nói chuyện lưu loát:</strong>
          <div className="method__content">
            <p>  - Luyện phát âm qua bài hát, phim hoặc giáo viên giúp bạn nói chuẩn hơn.
              Hãy tập trung vào các âm khó như /θ/, /ð/, /r/, /l/ để cải thiện giọng
              nói. Một số ứng dụng như Elsa Speak, BBC Learning English có thể giúp
              bạn luyện phát âm chính xác.</p>
            <p>- Bạn có thể thực hành phương pháp "Shadowing" – bắt chước cách phát âm, nhấn nhá và ngữ điệu của người bản xứ bằng cách nghe và lặp lại ngay lập tức. Điều này giúp bạn cải thiện kỹ năng nghe – nói đồng thời.</p>
          </div>
        </li>
      </ul>
      <h3 className="method__title">4. Các công cụ hỗ trợ học Tiếng Anh hiệu quả</h3>
      <div className="method__content--main">
        <p>Sử dụng các công cụ hỗ trợ sẽ giúp việc học Tiếng Anh trở nên dễ dàng và thú vị hơn. Dưới đây là một số công cụ hữu ích:</p>
      </div>

      <ul>
        <li className="method__item">
          <strong className="method__item--strong">4.1 Ứng dụng học Tiếng Anh trên điện thoại:</strong>
          <div className="method__content">
            <p>Các ứng dụng như Duolingo, Memrise, và Anki giúp bạn học từ vựng và ngữ pháp hiệu quả. Bạn có thể luyện tập hàng ngày với các bài tập vui nhộn và có hệ thống nhắc nhở để duy trì động lực. Những ứng dụng này còn cung cấp các bài kiểm tra để theo dõi tiến trình học tập của bạn.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">4.2 Trang web học Tiếng Anh miễn phí:</strong>
          <div className="method__content">
            <p>Các trang như BBC Learning English, Coursera, và FluentU cung cấp nhiều tài liệu học miễn phí. Bạn có thể tìm thấy các khóa học từ cơ bản đến nâng cao, phù hợp với mọi trình độ. Một số trang còn có video và bài tập tương tác để giúp bạn luyện nghe, đọc, viết và nói một cách toàn diện.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">4.3 Sử dụng từ điển trực tuyến:</strong>
          <div className="method__content">
            <p>Từ điển như Oxford, Cambridge, và Merriam-Webster giúp bạn tra cứu nghĩa và cách phát âm chuẩn. Ngoài ra, từ điển có phần phát âm giúp bạn luyện tập nghe và nói chính xác. Bạn cũng có thể sử dụng tính năng dịch nghĩa của Google Dịch hoặc DeepL để hỗ trợ khi gặp từ mới.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">4.4 Xem video và nghe podcast Tiếng Anh:</strong>
          <div className="method__content">
            <p>Các kênh như TED Talks, BBC News và The British Council cung cấp nội dung phong phú. Bạn có thể vừa học vừa giải trí, nâng cao khả năng nghe hiểu và phát âm. Ngoài ra, nghe podcast tiếng Anh như The Daily (New York Times) hoặc BBC 6 Minute English giúp bạn cải thiện kỹ năng nghe mà không cảm thấy nhàm chán.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">4.5 Học qua mạng xã hội:</strong>
          <div className="method__content">
            <p>Tham gia các nhóm học Tiếng Anh trên Facebook, Discord hoặc Reddit để trao đổi và thực hành. Việc trò chuyện thường xuyên giúp bạn tự tin hơn khi giao tiếp. Bạn cũng có thể theo dõi các kênh YouTube dạy Tiếng Anh như English Addict with Mr. Steve hoặc Learn English with Emma để học hỏi từ người bản xứ.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">4.6 Sử dụng AI để hỗ trợ học tập:</strong>
          <div className="method__content">
            <p>Các công cụ AI như ChatGPT, Grammarly có thể giúp bạn luyện viết, sửa lỗi ngữ pháp và cải thiện khả năng sử dụng tiếng Anh trong các tình huống thực tế. Grammarly không chỉ kiểm tra lỗi chính tả mà còn đề xuất cách viết tự nhiên hơn, giúp bạn nâng cao khả năng viết học thuật hoặc giao tiếp.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">4.7 Đọc sách và báo tiếng Anh:</strong>
          <div className="method__content">
            <p>Đọc sách, truyện hoặc báo tiếng Anh như The Guardian, New York Times giúp bạn mở rộng vốn từ và làm quen với cách diễn đạt tự nhiên. Nếu bạn mới bắt đầu, có thể chọn sách song ngữ hoặc các truyện ngắn đơn giản để dễ tiếp cận hơn.</p>
          </div>
        </li>
      </ul>


      <h3 className="method__title">5. Cách luyện kỹ năng nghe Tiếng Anh hiệu quả</h3>
      <div className="method__content--main">
        <p> Để cải thiện kỹ năng nghe, bạn cần thực hiện các phương pháp sau:</p>
      </div>

      <ul>
        <li className="method__item">
          <strong className="method__item--strong">5.1 Nghe Tiếng Anh mỗi ngày:</strong>
          <div className="method__content">
            <p>- Thường xuyên nghe các đoạn hội thoại, bài nói hoặc podcast bằng Tiếng Anh sẽ giúp bạn làm quen với cách phát âm và nhịp điệu của ngôn ngữ.</p>
            <p>- Bạn có thể bắt đầu với các đoạn hội thoại ngắn, sau đó nâng dần độ khó bằng cách nghe tin tức, bài giảng hoặc sách nói.</p>
            <p>- Việc nghe hàng ngày giúp não bộ thích nghi và cải thiện khả năng nhận diện âm thanh một cách tự nhiên.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">5.2 Nghe chủ động và có mục tiêu:</strong>
          <div className="method__content">
            <p>- Khi nghe, hãy tập trung vào nội dung chính, từ vựng và cách phát âm để hiểu rõ hơn.</p>
            <p>- Ghi chú lại những từ hoặc cụm từ mới mà bạn nghe được để mở rộng vốn từ.</p>
            <p>- Thử nghe một đoạn ngắn nhiều lần, sau đó tóm tắt nội dung bằng chính từ ngữ của mình.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">5.3 Xem phim, chương trình TV bằng Tiếng Anh:</strong>
          <div className="method__content">
            <p>- Chọn phim có phụ đề Tiếng Anh để vừa nghe vừa hiểu nội dung, giúp bạn làm quen với cách diễn đạt tự nhiên.</p>
            <p>- Cố gắng không phụ thuộc quá nhiều vào phụ đề, thay vào đó hãy đoán nghĩa qua ngữ cảnh.</p>
            <p>- Nghe đi nghe lại những câu thoại hay và thử nhại lại để luyện phát âm và ngữ điệu.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">5.4 Luyện nghe qua bài hát:</strong>
          <div className="method__content">
            <p>- Nghe và hát theo các bài hát Tiếng Anh giúp bạn cải thiện phát âm và từ vựng một cách tự nhiên.</p>
            <p>- Chọn những bài hát có lời dễ hiểu và tập trung vào cách phát âm của ca sĩ.</p>
            <p>- Sử dụng ứng dụng như LyricsTraining để luyện nghe theo lời bài hát một cách thú vị hơn.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">5.5 Nghe và nhại lại:</strong>
          <div className="method__content">
            <p>- Nhắc lại các câu trong đoạn hội thoại để làm quen với phát âm và ngữ điệu, giúp bạn nói tự nhiên hơn.</p>
            <p>- Bạn có thể sử dụng phương pháp Shadowing: nghe một câu và ngay lập tức nhắc lại với cùng ngữ điệu và tốc độ.</p>
            <p>- Thực hành thường xuyên sẽ giúp bạn tăng sự tự tin khi giao tiếp bằng Tiếng Anh.</p>
          </div>
        </li>
      </ul>

      <h3 className="method__title">6. Cách luyện kỹ năng đọc hiểu Tiếng Anh</h3>
      <div className="method__content--main">
        <p> Kỹ năng đọc hiểu rất quan trọng để mở rộng vốn từ và cải thiện ngữ pháp. Dưới đây là một số phương pháp hiệu quả giúp bạn cải thiện kỹ năng đọc hiểu: </p>
      </div>

      <ul>
        <li className="method__item">
          <strong className="method__item--strong">6.1 Bắt đầu với tài liệu phù hợp trình độ:</strong>
          <div className="method__content">
            <p>- Chọn sách, bài báo hoặc truyện phù hợp với khả năng của bạn để tránh cảm giác chán nản.</p>
            <p>- Đọc những nội dung mà bạn thực sự yêu thích để duy trì động lực học tập.</p>
            <p>- Khi trình độ tăng lên, hãy thử thách bản thân với các tài liệu khó hơn để mở rộng vốn từ vựng.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">6.2 Đọc mỗi ngày để hình thành thói quen:</strong>
          <div className="method__content">
            <p>- Dành thời gian đọc mỗi ngày, dù chỉ 10-15 phút, để tạo thói quen tốt.</p>
            <p>- Việc đọc thường xuyên giúp bạn cải thiện tốc độ đọc và khả năng hiểu nội dung.</p>
            <p>- Hãy mang theo một cuốn sách hoặc sử dụng ứng dụng đọc sách điện tử để có thể đọc bất cứ lúc nào.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">6.3 Không cần dịch từng từ:</strong>
          <div className="method__content">
            <p>- Khi đọc, hãy cố gắng hiểu ý chính thay vì dừng lại để dịch từng từ một.</p>
            <p>- Đọc qua toàn bộ đoạn văn trước, sau đó quay lại tra nghĩa của những từ quan trọng.</p>
            <p>- Kỹ năng đoán nghĩa từ ngữ cảnh sẽ giúp bạn đọc nhanh hơn và hiệu quả hơn.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">6.4 Ghi chú từ mới:</strong>
          <div className="method__content">
            <p>- Khi gặp từ mới, hãy ghi chú lại cùng với nghĩa và cách sử dụng của từ đó.</p>
            <p>- Học từ mới theo cụm từ hoặc câu thay vì học từng từ riêng lẻ.</p>
            <p>- Áp dụng từ mới vào thực tế bằng cách viết câu hoặc sử dụng trong giao tiếp.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">6.5 Tóm tắt lại nội dung:</strong>
          <div className="method__content">
            <p>- Sau khi đọc, hãy thử viết hoặc kể lại nội dung bằng chính từ ngữ của bạn.</p>
            <p>- Tóm tắt nội dung giúp bạn ghi nhớ thông tin tốt hơn và cải thiện khả năng diễn đạt.</p>
            <p>- Có thể ghi lại những ý chính trong một cuốn sổ để dễ dàng ôn tập lại sau này.</p>
          </div>
        </li>
      </ul>

      <h3 className="method__title">7. Cách luyện kỹ năng viết Tiếng Anh</h3>
      <div className="method__content--main">
        <p> Thực hành viết thường xuyên giúp bạn cải thiện khả năng diễn đạt và ghi nhớ từ vựng.
          Dưới đây là một số phương pháp hiệu quả giúp bạn nâng cao kỹ năng viết:</p>
      </div>

      <ul>
        <li className="method__item">
          <strong className="method__item--strong">7.1 Viết nhật ký bằng Tiếng Anh:</strong>
          <div className="method__content">
            <p>- Ghi lại suy nghĩ hàng ngày bằng Tiếng Anh giúp bạn thực hành tự nhiên và liên tục.</p>
            <p>- Việc viết nhật ký giúp bạn sử dụng từ vựng và cấu trúc câu theo cách riêng của mình.</p>
            <p>- Đừng lo lắng về lỗi sai, quan trọng là bạn có cơ hội thực hành và cải thiện.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">7.2 Học cách viết đúng ngữ pháp:</strong>
          <div className="method__content">
            <p>- Chú ý đến ngữ pháp và cấu trúc câu khi viết để tránh sai sót cơ bản.</p>
            <p>- Sử dụng tài liệu học ngữ pháp hoặc ứng dụng hỗ trợ để kiểm tra lỗi.</p>
            <p>- Thực hành viết câu ngắn trước, sau đó dần nâng cấp thành đoạn văn và bài viết dài hơn.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">7.3 Đọc nhiều để học cách viết hay:</strong>
          <div className="method__content">
            <p>- Đọc nhiều sách, báo, bài viết bằng Tiếng Anh giúp bạn học cách diễn đạt tự nhiên.</p>
            <p>- Quan sát cách tác giả sử dụng từ vựng, ngữ pháp và cách tổ chức ý tưởng.</p>
            <p>- Ghi chú những câu hay và thử áp dụng chúng vào bài viết của bạn.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">7.4 Sử dụng công cụ kiểm tra lỗi:</strong>
          <div className="method__content">
            <p>- Công cụ như Grammarly, Google Docs giúp kiểm tra lỗi chính tả và ngữ pháp.</p>
            <p>- Học từ những lỗi sai phổ biến để cải thiện khả năng viết lâu dài.</p>
            <p>- Không quá phụ thuộc vào công cụ, hãy cố gắng tự chỉnh sửa bài viết trước khi sử dụng.</p>
          </div>
        </li>
        <li className="method__item">
          <strong className="method__item--strong">7.5 Viết bài luận hoặc tham gia diễn đàn:</strong>
          <div className="method__content">
            <p>- Viết bài trên các diễn đàn Tiếng Anh giúp bạn luyện viết thực tế và nhận phản hồi từ người khác.</p>
            <p>- Tham gia vào các cuộc thảo luận giúp bạn nâng cao khả năng lập luận và tổ chức bài viết.</p>
            <p>- Cố gắng diễn đạt ý tưởng một cách rõ ràng, mạch lạc và logic.</p>
          </div>
        </li>

<h3 className="method__title">Các video hay giúp thay đổi mindset cách học tiếng Anh</h3>
<div className="method__content--main">
  <div className="video-item">
    <a 
      href="https://www.youtube.com/watch?v=_nuQ39Y4T5Q" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="video-link"
    >
      1. Cách Tự Học Tiếng Anh | Áp dụng cho mọi người (phương pháp + tài liệu gợi ý) VyVocab Ep.110
    </a>
  </div>
  <div className="video-item">
    <a 
      href="https://www.youtube.com/watch?v=kwg4ZMEsSBg" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="video-link"
    >
      2. Cách Luyện KIÊN TRÌ Học tiếng Anh
    </a>
  </div>
  <div className="video-item">
    <a 
      href="https://www.youtube.com/watch?v=LUMSV0oU7cc" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="video-link"
    >
      3. 4 cách tự học tiếng Anh cực kỳ hiệu quả - Xem đi để giỏi
    </a>
  </div>
  <div className="video-item">
    <a 
      href="https://www.youtube.com/watch?v=RMoF5uRgu8Q" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="video-link"
    >
      4. Mình nói tiếng Anh lưu loát nhờ cách học này | Lộ trình tự học + nguồn học + FREE Plan chi tiết
    </a>
  </div>
</div>


      </ul>
    </>
  );
}

export default Method;
