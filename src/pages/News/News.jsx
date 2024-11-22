import React from 'react'
import { Typography, Card, Row, Col, Image } from 'antd'
import {
  ShopOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const News = () => {
  const features = [
    {
      icon: <ShopOutlined className="text-4xl text-blue-600" />,
      title: 'Đa dạng sản phẩm',
      description: 'Hơn 1000+ sản phẩm văn phòng phẩm chất lượng cao',
    },
    {
      icon: <CheckCircleOutlined className="text-4xl text-blue-600" />,
      title: 'Chất lượng đảm bảo',
      description: '100% sản phẩm chính hãng, bảo hành toàn quốc',
    },
    {
      icon: <TeamOutlined className="text-4xl text-blue-600" />,
      title: 'Dịch vụ chuyên nghiệp',
      description: 'Đội ngũ tư vấn 24/7, giao hàng nhanh chóng',
    },
    {
      icon: <SafetyCertificateOutlined className="text-4xl text-blue-600" />,
      title: 'Giá cả cạnh tranh',
      description: 'Cam kết giá tốt nhất thị trường',
    },
  ]

  const stats = [
    {
      icon: <RocketOutlined className="text-3xl text-blue-600" />,
      number: '50K+',
      title: 'Đơn hàng thành công',
    },
    {
      icon: <HeartOutlined className="text-3xl text-blue-600" />,
      number: '10K+',
      title: 'Khách hàng hài lòng',
    },
    {
      icon: <StarOutlined className="text-3xl text-blue-600" />,
      number: '1K+',
      title: 'Đánh giá 5 sao',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative mb-16 overflow-hidden rounded-xl">
        <div className="absolute inset-0">
          <Image
            preview={false}
            src="https://img.freepik.com/free-photo/flat-lay-stationary-arrangement-desk_23-2149309649.jpg"
            className="w-full h-[400px] object-cover"
            alt="Hero background"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-600/70" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Title level={1} className="!text-white !mb-6">
              Văn Phòng Phẩm Online
            </Title>
            <Paragraph className="text-lg text-gray-100">
              Đồng hành cùng bạn trong mọi khoảnh khắc sáng tạo với những sản phẩm văn phòng phẩm
              chất lượng cao và dịch vụ chuyên nghiệp.
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Row gutter={[24, 24]} className="mb-24">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="h-full text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              bordered={false}
            >
              <div className="mb-4">{feature.icon}</div>
              <Title level={4} className="!mb-2">
                {feature.title}
              </Title>
              <Paragraph className="text-gray-600">{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* About Section */}
      <Row gutter={[48, 48]} className="mb-24">
        <Col xs={24} lg={12}>
          <Image
            src="https://img.freepik.com/free-photo/office-table-with-cup-coffee-keyboard-notepad_1220-4617.jpg"
            className="rounded-lg shadow-lg"
            alt="About us"
          />
        </Col>
        <Col xs={24} lg={12} className="flex flex-col justify-center">
          <Title level={2} className="!mb-6">
            Về Chúng Tôi
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-4">
            Chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực cung cấp văn phòng phẩm trực tuyến,
            mang đến trải nghiệm mua sắm thuận tiện và đáng tin cậy cho khách hàng.
          </Paragraph>
          <Paragraph className="text-lg text-gray-600">
            Với hơn 10 năm kinh nghiệm, chúng tôi không ngừng đổi mới và phát triển để đáp ứng mọi
            nhu cầu của khách hàng với phương châm "Chất lượng là danh dự".
          </Paragraph>
        </Col>
      </Row>

      {/* Stats Section */}
      <Card className="mb-24 bg-gradient-to-r from-blue-50 to-blue-100 border-none">
        <Row gutter={[32, 32]} className="py-8">
          {stats.map((stat, index) => (
            <Col xs={24} sm={8} key={index}>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                {stat.icon}
                <Title level={2} className="!mb-2 !mt-4">
                  {stat.number}
                </Title>
                <Paragraph className="text-gray-600">{stat.title}</Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Values Section */}
      <div className="text-center mb-24">
        <Title level={2} className="!mb-16">
          Giá Trị Cốt Lõi
        </Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Image
              src="https://img.freepik.com/free-photo/high-angle-desk-arrangement-with-notebook-coffee_23-2148309548.jpg"
              className="rounded-lg mb-4 hover:opacity-90 transition-opacity duration-300"
              alt="Quality"
            />
            <Title level={4}>Chất Lượng</Title>
            <Paragraph className="text-gray-600">
              Cam kết cung cấp sản phẩm chất lượng cao
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Image
              src="https://img.freepik.com/free-photo/flat-lay-desk-arrangement-with-copy-space_23-2148309596.jpg"
              className="rounded-lg mb-4 hover:opacity-90 transition-opacity duration-300"
              alt="Service"
            />
            <Title level={4}>Dịch Vụ</Title>
            <Paragraph className="text-gray-600">
              Phục vụ khách hàng tận tâm, chuyên nghiệp
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Image
              src="https://img.freepik.com/free-photo/flat-lay-stationary-arrangement_23-2149309642.jpg"
              className="rounded-lg mb-4 hover:opacity-90 transition-opacity duration-300"
              alt="Innovation"
            />
            <Title level={4}>Đổi Mới</Title>
            <Paragraph className="text-gray-600">Liên tục cập nhật xu hướng mới nhất</Paragraph>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default News
