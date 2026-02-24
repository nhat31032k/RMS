import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import './globals.css';
import ReactQueryProvider from '../components/shared/ReactQueryProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1677ff', // Đã sửa từ primaryColor
              }
            }}
          >
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}