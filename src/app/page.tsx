'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Layout, Menu, Avatar, Badge, Space, Typography, Drawer, Button, Card, Grid } from 'antd';
import {
    LayoutDashboard, Home, Users, ReceiptText, Settings,
    Bell, Search, Menu as MenuIcon, X
} from 'lucide-react';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

export default function HomePage() {
    const [collapsed, setCollapsed] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false); // Quản lý menu trên Mobile
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const isMobile = screens.md === false;
    const menuItems = [
        { key: '1', icon: <LayoutDashboard size={20} />, label: 'Tổng quan' },
        { key: '2', icon: <Home size={20} />, label: 'Quản lý phòng' },
        { key: '3', icon: <Users size={20} />, label: 'Khách thuê' },
        { key: '4', icon: <ReceiptText size={20} />, label: 'Hóa đơn' },
        { key: '5', icon: <Settings size={20} />, label: 'Cấu hình' },
    ];
    return (
        <Layout className="min-h-screen bg-[#f8fafc]">
            {/* SIDEBAR - Ẩn trên Mobile (dưới 768px) */}
            <Sider
                width={260}
                collapsed={collapsed}
                className="hidden! md:block! bg-[#0f172a]! border-r border-slate-800 sticky top-0 h-screen"
            >
                <SidebarContent menuItems={menuItems} />
            </Sider>

            {/* DRAWER - Menu cho Mobile */}
            <Drawer
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                size="default" // Thay cho width={260} để dùng size mặc định, hoặc giữ 260 nếu muốn cố định
                closable={false}
                // Sửa bodyStyle thành styles={{ body: ... }}
                styles={{
                    body: { padding: 0, backgroundColor: '#0f172a' }
                }}
            >
                <div className="flex justify-end p-4">
                    <X className="text-slate-400 cursor-pointer" onClick={() => setOpenDrawer(false)} />
                </div>
                <SidebarContent menuItems={menuItems} />
            </Drawer>

            <Layout>
                {/* HEADER - Tự thích ứng */}
                <Header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-4 md:px-8 flex justify-between items-center h-16 md:h-20 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        {/* NÚT MENU: Dùng class Tailwind để ẩn/hiện thay vì logic JS */}
                        <div className="md:hidden flex items-center">
                            <Button
                                type="text"
                                onClick={() => setOpenDrawer(true)}
                                icon={<MenuIcon size={24} className="text-white" />}
                            />
                        </div>

                        {/* THANH SEARCH: Dùng hidden md:flex để luôn hiện đúng trên Desktop */}
                        <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2.5 rounded-2xl w-80 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                            <Search size={18} className="text-slate-400" />
                            <input placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none text-sm w-full" />
                        </div>
                    </div>

                    {/* PHẦN USER: Dùng screens.md chỉ để chỉnh khoảng cách Space */}
                    <Space size={screens.md ? 24 : 12}>
                        <Badge count={5} size="small" color="#3b82f6">
                            <Bell size={20} className="text-slate-400" />
                        </Badge>
                        <div className="h-6 w-px bg-slate-100 hidden sm:block" />
                        <Space className="cursor-pointer">
                            {/* Tên Admin: Tự ẩn trên mobile qua class hidden xs:block */}
                            <div className="text-right leading-tight hidden xs:block">
                                <Text className="font-bold text-xs md:text-sm block">Nguyễn Nhật</Text>
                                <Text className="text-[9px] md:text-[10px] text-blue-500 font-bold uppercase tracking-wider">Super Admin</Text>
                            </div>
                            <Avatar
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nhat"
                                size={{ xs: 32, sm: 32, md: 40, lg: 40 }}
                            />
                        </Space>
                    </Space>
                </Header>

                {/* CONTENT - Bo góc nhẹ hơn trên Mobile để tối ưu diện tích */}
                <Content className="p-4 md:p-8">
                    <div className="max-w-350 mx-auto">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <Title level={2} className="mb-1!">Bảng điều khiển</Title>
                            <Text className="text-slate-400">Chào mừng quay trở lại, hệ thống đã sẵn sàng.</Text>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                            {[
                                { title: 'Tổng số phòng', value: '24', color: 'blue', icon: <Home size={20} /> },
                                { title: 'Đang thuê', value: '18', color: 'emerald', icon: <Users size={20} /> },
                                { title: 'Phòng trống', value: '06', color: 'orange', icon: <Search size={20} /> },
                                { title: 'Hóa đơn nợ', value: '03', color: 'red', icon: <ReceiptText size={20} /> },
                            ].map((item, idx) => (
                                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} key={idx} className="h-full">
                                    <Card
                                        variant="borderless"
                                        className="rounded-3xl! shadow-sm overflow-hidden group h-full"
                                        styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <Text className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{item.title}</Text>
                                                <div className="text-3xl font-black mt-2 text-slate-800">{item.value}</div>
                                            </div>
                                            <div className={`p-3 rounded-2xl bg-${item.color}-50 text-${item.color}-500 group-hover:scale-110 transition-transform`}>
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+2.5%</span>
                                            <span className="text-[10px] text-slate-300 font-medium">so với tháng trước</span>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Phần nội dung chi tiết (Ví dụ: Danh sách phòng hoặc Biểu đồ) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card title="Phòng sắp hết hạn hợp đồng" className="lg:col-span-2 rounded-3xl! shadow-sm border-none" variant="borderless">
                                <Text className="text-slate-400 italic">Dữ liệu danh sách phòng sẽ hiển thị ở đây...</Text>
                            </Card>
                            <Card title="Ghi chú nhanh" className="rounded-3xl! shadow-sm border-none" variant="borderless">
                                <Text className="text-slate-400 italic">Kéo thả hoặc ghi chú tại đây...</Text>
                            </Card>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

// Tách Sidebar ra thành Component riêng để dùng cho cả Sider và Drawer
function SidebarContent({ menuItems }: { menuItems: any }) {
    return (
        <div className="h-full flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">RM</div>
                <span className="text-white font-bold text-lg">RMS Smart</span>
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
                className="bg-transparent! border-none! px-3 flex-1"
                theme="dark"
            />
        </div>
    );
}