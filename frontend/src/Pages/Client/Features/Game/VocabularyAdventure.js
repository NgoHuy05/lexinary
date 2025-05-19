import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export default function VocabularyAdventure() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Result
        icon={<SmileOutlined style={{ color: '#1890ff' }} />}
        title="Bảo trì"
        subTitle="Trò chơi 'Vocabulary Adventure' đang trong giai đoạn hoàn thiện phát triển. Vui lòng quay lại sau!"
        extra={
          <Button type="primary" href="/">
            Quay lại trang chủ
          </Button>
        }
        style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '1rem', 
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
        }}
      />
    </div>
  );
}
