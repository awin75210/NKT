// Global variables
let currentFilter = "all"
let currentPage = 1
const itemsPerPage = 6
let allCenters = []

// Volunteer storage system
let volunteers = JSON.parse(localStorage.getItem('volunteers')) || []
let volunteerStats = JSON.parse(localStorage.getItem('volunteerStats')) || {
  total: 0,
  blood: 0,
  clothes: 0,
  food: 0,
  education: 0,
  medical: 0,
  emergency: 0
}

// Initialize with sample data if no volunteers exist
if (volunteers.length === 0) {
  const sampleVolunteers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      serviceType: 'blood',
      phone: '0901234567',
      email: 'an.nguyen@email.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      registrationDate: '01/12/2024 09:30:00',
      status: 'confirmed',
      bloodType: 'O+',
      weight: '65',
      preferredDate: 'morning'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      serviceType: 'clothes',
      phone: '0912345678',
      email: 'binh.tran@email.com',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      registrationDate: '02/12/2024 14:15:00',
      status: 'pending',
      clothesType: 'adult-clothes'
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      serviceType: 'food',
      phone: '0923456789',
      email: 'cuong.le@email.com',
      address: '789 Đường DEF, Quận 5, TP.HCM',
      registrationDate: '03/12/2024 10:45:00',
      status: 'confirmed',
      foodType: 'cooked-food'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      serviceType: 'education',
      phone: '0934567890',
      email: 'dung.pham@email.com',
      address: '321 Đường GHI, Quận 7, TP.HCM',
      registrationDate: '04/12/2024 16:20:00',
      status: 'pending',
      educationType: 'scholarship'
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      serviceType: 'medical',
      phone: '0945678901',
      email: 'em.hoang@email.com',
      address: '654 Đường JKL, Quận 10, TP.HCM',
      registrationDate: '05/12/2024 11:30:00',
      status: 'confirmed',
      medicalType: 'consultation'
    }
  ]
  
  volunteers = sampleVolunteers
  volunteerStats = {
    total: 5,
    blood: 1,
    clothes: 1,
    food: 1,
    education: 1,
    medical: 1,
    emergency: 0
  }
  
  localStorage.setItem('volunteers', JSON.stringify(volunteers))
  localStorage.setItem('volunteerStats', JSON.stringify(volunteerStats))
}

// ví dụ một vài trung tâm chăm sóc
const supportCenters = [
  {
    id: 1,
    name: "Trung Tâm Hiến Máu Nhân Đạo",
    type: "blood",
    city: "hanoi",
    address: "106 Thiên Phước, Phường 9, Tân Bình, Hồ Chí Minh, Việt Nam",
    phone: "024-3123-4567",
    email: "info@hienmauvn.org",
    website: "www.hienmauvn.org",
    services: ["Hiến máu", "Xét nghiệm", "Tư vấn"],
    hours: "7:00 - 17:00",
    description: "Trung tâm hiến máu lớn nhất miền Bắc với đội ngũ y bác sĩ chuyên nghiệp.",
  },
  {
    id: 2,
    name: "Quỹ Từ Thiện Áo Ấm Mùa Đông",
    type: "clothes",
    city: "hcm",
    address: "456 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    phone: "028-3987-6543",
    email: "contact@aoammuadong.org",
    website: "www.aoammuadong.org",
    services: ["Thu gom quần áo", "Phân phối", "Tái chế"],
    hours: "8:00 - 18:00",
    description: "Tổ chức từ thiện chuyên thu gom và phân phối quần áo cho người nghèo.",
  },
  {
    id: 3,
    name: "Bếp Ăn Từ Thiện Tình Thương",
    type: "food",
    city: "danang",
    address: "789 Lê Duẩn, Hải Châu, Đà Nẵng",
    phone: "0236-3456-789",
    email: "bepan@tinhthuong.org",
    website: "www.bepantinhthuong.org",
    services: ["Bữa ăn miễn phí", "Thực phẩm khô", "Nước sạch"],
    hours: "6:00 - 20:00",
    description: "Cung cấp bữa ăn miễn phí cho người vô gia cư và hoàn cảnh khó khăn.",
  },
  {
    id: 4,
    name: "Quỹ Học Bổng Vì Tương Lai",
    type: "education",
    city: "haiphong",
    address: "321 Điện Biên Phủ, Lê Chân, Hải Phòng",
    phone: "0225-3789-012",
    email: "scholarship@future.edu.vn",
    website: "www.hocbongtuonglai.org",
    services: ["Học bổng", "Sách vở", "Dụng cụ học tập"],
    hours: "8:00 - 17:00",
    description: "Hỗ trợ học bổng và dụng cụ học tập cho trẻ em có hoàn cảnh khó khăn.",
  },
  {
    id: 5,
    name: "Trung Tâm Y Tế Cộng Đồng",
    type: "medical",
    city: "cantho",
    address: "654 Trần Hưng Đạo, Ninh Kiều, Cần Thơ",
    phone: "0292-3234-567",
    email: "medical@community.org",
    website: "www.ytecongdong.org",
    services: ["Khám bệnh miễn phí", "Thuốc men", "Tư vấn sức khỏe"],
    hours: "7:00 - 19:00",
    description: "Cung cấp dịch vụ y tế miễn phí cho người nghèo và vùng sâu vùng xa.",
  },
  {
    id: 6,
    name: "Đội Cứu Hộ Khẩn Cấp Việt Nam",
    type: "emergency",
    city: "hanoi",
    address: "987 Giải Phóng, Hai Bà Trưng, Hà Nội",
    phone: "024-3567-890",
    email: "emergency@rescue.vn",
    website: "www.cuuhokhancan.org",
    services: ["Cứu hộ", "Hỗ trợ thiên tai", "Sơ cứu"],
    hours: "24/7",
    description: "Đội cứu hộ chuyên nghiệp hỗ trợ trong các tình huống khẩn cấp.",
  },
]

// Service modal content
const serviceModalContent = {
  blood: {
    title: "Đăng Ký Hiến Máu Nhân Đạo",
    content: `
            <div class="service-modal-content">
                <div class="service-info">
                    <h4>Thông Tin Hiến Máu</h4>
                    <ul>
                        <li>Độ tuổi: 18-60 tuổi</li>
                        <li>Cân nặng: Tối thiểu 45kg</li>
                        <li>Sức khỏe tốt, không mắc bệnh truyền nhiễm</li>
                        <li>Không sử dụng rượu bia 24h trước khi hiến máu</li>
                        <li>Nghỉ ngơi đầy đủ trước khi hiến máu</li>
                    </ul>
                </div>
                <form id="bloodDonationForm" class="modal-form">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Họ và tên *" required>
                    </div>
                    <div class="form-group">
                        <input type="date" name="birthDate" placeholder="Ngày sinh *" required>
                    </div>
                    <div class="form-group">
                        <select name="gender" required>
                            <option value="">Giới tính *</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Số điện thoại *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email *" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="address" placeholder="Địa chỉ *" required>
                    </div>
                    <div class="form-group">
                        <input type="number" name="weight" placeholder="Cân nặng (kg) *" required min="45">
                    </div>
                    <div class="form-group">
                        <select name="bloodType">
                            <option value="">Nhóm máu (nếu biết)</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="preferredDate" required>
                            <option value="">Thời gian mong muốn *</option>
                            <option value="morning">Sáng (8:00-12:00)</option>
                            <option value="afternoon">Chiều (13:00-17:00)</option>
                            <option value="weekend">Cuối tuần</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="notes" placeholder="Ghi chú (nếu có)" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="agreement" required>
                            <span>Tôi đồng ý với các điều khoản và cam kết thông tin cung cấp là chính xác</span>
                        </label>
                    </div>
                    <button type="submit" class="btn-primary">Đăng Ký Hiến Máu</button>
                </form>
            </div>
        `,
  },
  clothes: {
    title: "Quyên Góp Quần Áo",
    content: `
            <div class="service-modal-content">
                <div class="service-info">
                    <h4>Hướng Dẫn Quyên Góp</h4>
                    <ul>
                        <li>Quần áo còn sử dụng được, sạch sẽ</li>
                        <li>Không rách, không ố vàng</li>
                        <li>Đã được giặt sạch và phơi khô</li>
                        <li>Phân loại theo độ tuổi và giới tính</li>
                        <li>Đóng gói gọn gàng trong túi hoặc thùng</li>
                    </ul>
                </div>
                <form id="clothesDonationForm" class="modal-form">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Họ và tên *" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Số điện thoại *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="text" name="address" placeholder="Địa chỉ nhận hàng *" required>
                    </div>
                    <div class="form-group">
                        <select name="clothesType" required>
                            <option value="">Loại quần áo *</option>
                            <option value="adult-clothes">Quần áo người lớn</option>
                            <option value="children-clothes">Quần áo trẻ em</option>
                            <option value="baby-clothes">Quần áo em bé</option>
                            <option value="winter-clothes">Quần áo mùa đông</option>
                            <option value="shoes">Giày dép</option>
                            <option value="accessories">Phụ kiện</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="number" name="quantity" placeholder="Số lượng (ước tính) *" required min="1">
                    </div>
                    <div class="form-group">
                        <select name="pickupTime" required>
                            <option value="">Thời gian nhận hàng *</option>
                            <option value="morning">Sáng (8:00-12:00)</option>
                            <option value="afternoon">Chiều (13:00-17:00)</option>
                            <option value="evening">Tối (18:00-20:00)</option>
                            <option value="weekend">Cuối tuần</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="description" placeholder="Mô tả chi tiết về quần áo quyên góp" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Đăng Ký Quyên Góp</button>
                </form>
            </div>
        `,
  },
  food: {
    title: "Hỗ Trợ Thực Phẩm",
    content: `
            <div class="service-modal-content">
                <div class="service-info">
                    <h4>Các Hình Thức Hỗ Trợ</h4>
                    <ul>
                        <li>Quyên góp thực phẩm khô (gạo, mì, dầu ăn...)</li>
                        <li>Tài trợ bữa ăn cho người nghèo</li>
                        <li>Tham gia nấu ăn tình nguyện</li>
                        <li>Hỗ trợ vận chuyển thực phẩm</li>
                        <li>Quyên góp tiền mặt mua thực phẩm</li>
                    </ul>
                </div>
                <form id="foodSupportForm" class="modal-form">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Họ và tên *" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Số điện thoại *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <select name="supportType" required>
                            <option value="">Hình thức hỗ trợ *</option>
                            <option value="food-donation">Quyên góp thực phẩm</option>
                            <option value="meal-sponsor">Tài trợ bữa ăn</option>
                            <option value="volunteer-cook">Tình nguyện nấu ăn</option>
                            <option value="transport">Hỗ trợ vận chuyển</option>
                            <option value="money-donation">Quyên góp tiền</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" name="quantity" placeholder="Số lượng/Số tiền dự kiến">
                    </div>
                    <div class="form-group">
                        <select name="frequency" required>
                            <option value="">Tần suất hỗ trợ *</option>
                            <option value="one-time">Một lần</option>
                            <option value="weekly">Hàng tuần</option>
                            <option value="monthly">Hàng tháng</option>
                            <option value="holiday">Dịp lễ tết</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="notes" placeholder="Ghi chú thêm" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Đăng Ký Hỗ Trợ</button>
                </form>
            </div>
        `,
  },
  education: {
    title: "Hỗ Trợ Giáo Dục",
    content: `
            <div class="service-modal-content">
                <div class="service-info">
                    <h4>Các Chương Trình Hỗ Trợ</h4>
                    <ul>
                        <li>Học bổng cho học sinh nghèo vượt khó</li>
                        <li>Quyên góp sách vở, dụng cụ học tập</li>
                        <li>Dạy học miễn phí cho trẻ em</li>
                        <li>Xây dựng thư viện cộng đồng</li>
                        <li>Hỗ trợ học phí cho sinh viên</li>
                    </ul>
                </div>
                <form id="educationSupportForm" class="modal-form">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Họ và tên *" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Số điện thoại *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <select name="supportType" required>
                            <option value="">Hình thức hỗ trợ *</option>
                            <option value="scholarship">Tài trợ học bổng</option>
                            <option value="books-supplies">Quyên góp sách vở</option>
                            <option value="tutoring">Dạy học tình nguyện</option>
                            <option value="library">Xây dựng thư viện</option>
                            <option value="tuition">Hỗ trợ học phí</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="educationLevel" required>
                            <option value="">Cấp học *</option>
                            <option value="elementary">Tiểu học</option>
                            <option value="middle">Trung học cơ sở</option>
                            <option value="high">Trung học phổ thông</option>
                            <option value="university">Đại học</option>
                            <option value="vocational">Dạy nghề</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" name="subject" placeholder="Môn học/Lĩnh vực (nếu có)">
                    </div>
                    <div class="form-group">
                        <textarea name="experience" placeholder="Kinh nghiệm/Khả năng của bạn" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Đăng Ký Hỗ Trợ</button>
                </form>
            </div>
        `,
  },
  medical: {
    title: "Hỗ Trợ Y Tế",
    content: `
            <div class="service-modal-content">
                <div class="service-info">
                    <h4>Các Dịch Vụ Y Tế</h4>
                    <ul>
                        <li>Khám bệnh miễn phí cho người nghèo</li>
                        <li>Hỗ trợ chi phí phẫu thuật</li>
                        <li>Cung cấp thuốc men miễn phí</li>
                        <li>Tư vấn sức khỏe cộng đồng</li>
                        <li>Chăm sóc người già, trẻ em</li>
                    </ul>
                </div>
                <form id="medicalSupportForm" class="modal-form">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Họ và tên *" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Số điện thoại *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <select name="supportType" required>
                            <option value="">Loại hỗ trợ *</option>
                            <option value="volunteer-doctor">Bác sĩ tình nguyện</option>
                            <option value="medical-donation">Quyên góp thuốc men</option>
                            <option value="financial-support">Hỗ trợ tài chính</option>
                            <option value="equipment-donation">Quyên góp thiết bị y tế</option>
                            <option value="health-education">Giáo dục sức khỏe</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" name="specialty" placeholder="Chuyên khoa (nếu là bác sĩ)">
                    </div>
                    <div class="form-group">
                        <input type="text" name="license" placeholder="Số chứng chỉ hành nghề (nếu có)">
                    </div>
                    <div class="form-group">
                        <select name="availability" required>
                            <option value="">Thời gian có thể hỗ trợ *</option>
                            <option value="weekdays">Ngày thường</option>
                            <option value="weekends">Cuối tuần</option>
                            <option value="evenings">Buổi tối</option>
                            <option value="emergency">Khẩn cấp</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="experience" placeholder="Kinh nghiệm và khả năng hỗ trợ" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Đăng Ký Hỗ Trợ</button>
                </form>
            </div>
        `,
  },
  emergency: {
    title: "Hỗ Trợ Khẩn Cấp",
    content: `
            <div class="service-modal-content">
                <div class="service-info">
                    <h4>Dịch Vụ Khẩn Cấp</h4>
                    <ul>
                        <li>Cứu hộ trong thiên tai, thảm họa</li>
                        <li>Hỗ trợ y tế khẩn cấp</li>
                        <li>Cung cấp nơi ở tạm thời</li>
                        <li>Phân phối cứu trợ khẩn cấp</li>
                        <li>Tìm kiếm cứu nạn</li>
                    </ul>
                </div>
                <form id="emergencySupportForm" class="modal-form">
                    <div class="form-group">
                        <input type="text" name="fullName" placeholder="Họ và tên *" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Số điện thoại *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <select name="supportType" required>
                            <option value="">Loại hỗ trợ *</option>
                            <option value="rescue-volunteer">Tình nguyện viên cứu hộ</option>
                            <option value="medical-emergency">Y tế khẩn cấp</option>
                            <option value="shelter-support">Hỗ trợ nơi ở</option>
                            <option value="supply-distribution">Phân phối cứu trợ</option>
                            <option value="search-rescue">Tìm kiếm cứu nạn</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="skills" required>
                            <option value="">Kỹ năng chuyên môn *</option>
                            <option value="first-aid">Sơ cứu</option>
                            <option value="swimming">Bơi lội</option>
                            <option value="climbing">Leo núi</option>
                            <option value="driving">Lái xe chuyên dụng</option>
                            <option value="communication">Thông tin liên lạc</option>
                            <option value="logistics">Hậu cần</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="text" name="certification" placeholder="Chứng chỉ liên quan (nếu có)">
                    </div>
                    <div class="form-group">
                        <select name="availability" required>
                            <option value="">Sẵn sàng hỗ trợ *</option>
                            <option value="immediate">Ngay lập tức</option>
                            <option value="within-hours">Trong vài giờ</option>
                            <option value="within-day">Trong ngày</option>
                            <option value="planned">Theo kế hoạch</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="experience" placeholder="Kinh nghiệm cứu hộ/hỗ trợ khẩn cấp" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Đăng Ký Hỗ Trợ</button>
                </form>
            </div>
        `,
  },
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  loadSupportCenters()
  setupScrollAnimations()
  setupCounterAnimations()
  allCenters = [...supportCenters]

  // Initialize volunteer contributions system
  updateContributionStats()
  updateContributionsDisplay()

  // --- Contribution Acknowledgment Logic ---
  const contributionForm = document.getElementById('contributionForm');
  const contributionList = document.getElementById('contributionList');
  const contributionSearch = document.getElementById('contributionSearch');
  const contributionStats = document.getElementById('contributionStats');
  let contributions = JSON.parse(localStorage.getItem('contributions') || '[]');
  let filteredContributions = contributions;

  function renderContributionStats() {
    if (!contributionStats) return;
    const list = filteredContributions || [];
    const total = list.length;
    const byType = { money: 0, clothes: 0, food: 0, volunteer: 0, other: 0 };
    list.forEach(c => { if (byType[c.type] !== undefined) byType[c.type]++; });
    contributionStats.innerHTML = `
      <div style="display:flex;gap:2rem;flex-wrap:wrap;align-items:center;">
        <div><b>Tổng số đóng góp:</b> ${total}</div>
        <div><b>Tiền mặt:</b> ${byType.money}</div>
        <div><b>Quần áo:</b> ${byType.clothes}</div>
        <div><b>Thực phẩm:</b> ${byType.food}</div>
        <div><b>Tình nguyện:</b> ${byType.volunteer}</div>
        <div><b>Khác:</b> ${byType.other}</div>
      </div>
    `;
  }

  function renderContributions() {
    if (!contributionList) return;
    // Keep the example row at the top
    let html = contributionList.querySelector('.example-row')?.outerHTML || '';
    if (!filteredContributions || filteredContributions.length === 0) {
      html += '<div class="empty-state">Chưa có đóng góp nào được ghi nhận.</div>';
    } else {
      html += filteredContributions.map(c => `
        <div class="contribution-item">
          <div class="contribution-header">
            <span class="contributor-name"><i class="fas fa-user"></i> ${c.name}</span>
            <span class="contribution-type">${getContributionTypeLabel(c.type)}</span>
          </div>
          <div class="contribution-message"><b>Đã đóng góp:</b> ${getContributionTypeLabel(c.type)}${c.message ? ' - ' + c.message : ''}</div>
          <div class="contribution-time">${c.time}</div>
        </div>
      `).join('');
    }
    contributionList.innerHTML = html;
    renderContributionStats();
  }

  function filterContributionsByName(name) {
    if (!name) {
      filteredContributions = contributions;
    } else {
      filteredContributions = contributions.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }
    renderContributions();
  }

  function getContributionTypeLabel(type) {
    switch(type) {
      case 'money': return 'Tiền mặt';
      case 'clothes': return 'Quần áo';
      case 'food': return 'Thực phẩm';
      case 'volunteer': return 'Tình nguyện';
      case 'other': return 'Khác';
      default: return '';
    }
  }

  if (contributionForm) {
    contributionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contributorName').value.trim();
      const type = document.getElementById('contributionType').value;
      const message = document.getElementById('contributionMessage').value.trim();
      if (!name || !type) return;
      const now = new Date();
      const time = now.toLocaleString('vi-VN');
      const newContribution = { name, type, message, time };
      contributions.unshift(newContribution);
      if (contributions.length > 20) contributions = contributions.slice(0, 20); // keep only latest 20
      localStorage.setItem('contributions', JSON.stringify(contributions));
      filterContributionsByName(contributionSearch ? contributionSearch.value : '');
      contributionForm.reset();
    });
    filterContributionsByName(contributionSearch ? contributionSearch.value : '');
  }

  if (contributionSearch) {
    contributionSearch.addEventListener('input', function(e) {
      filterVolunteersByName(e.target.value);
    });
  }

  // --- Situation Chat Logic ---
  const situationForm = document.getElementById('situationForm');
  const situationChatFrame = document.getElementById('situationChatFrame');
  let situations = JSON.parse(localStorage.getItem('situations') || '[]');

  function renderSituations() {
    if (!situationChatFrame) return;
    if (situations.length === 0) {
      situationChatFrame.innerHTML = '<div class="empty-state">Chưa có chia sẻ nào.</div>';
      return;
    }
    situationChatFrame.innerHTML = situations.map(s => `
      <div class="chat-message situation">
        <div class="situation-header"><i class="fas fa-user-circle"></i> <b>${s.name}</b> <span class="situation-time">${s.time}</span></div>
        <div class="situation-message">${s.message}</div>
      </div>
    `).join('');
  }

  if (situationForm) {
    situationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('situationName').value.trim();
      const message = document.getElementById('situationMessage').value.trim();
      if (!name || !message) return;
      const now = new Date();
      const time = now.toLocaleString('vi-VN');
      const newSituation = { name, message, time };
      situations.unshift(newSituation);
      if (situations.length > 50) situations = situations.slice(0, 50); // keep only latest 50
      localStorage.setItem('situations', JSON.stringify(situations));
      renderSituations();
      situationForm.reset();
    });
    renderSituations();
  }
}

function setupEventListeners() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentFilter = btn.dataset.filter
      currentPage = 1
      filterAndDisplayCenters()
    })
  })

  // Search functionality
  const searchInput = document.getElementById("centerSearch")
  const cityFilter = document.getElementById("cityFilter")

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(() => {
        currentPage = 1
        filterAndDisplayCenters()
      }, 300),
    )
  }

  if (cityFilter) {
    cityFilter.addEventListener("change", () => {
      currentPage = 1
      filterAndDisplayCenters()
    })
  }

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreCenters")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentPage++
      filterAndDisplayCenters(true)
    })
  }

  // Contact form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }

  // Modal close events
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal()
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Dropdown ngôn ngữ
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', function(e) {
      e.preventDefault();
      langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.language-switcher')) {
        langDropdown.style.display = 'none';
      }
    });
    document.querySelectorAll('.lang-option').forEach(function(opt) {
      opt.addEventListener('click', function(e) {
        e.preventDefault();
        langDropdown.style.display = 'none';
        applyTranslation(opt.dataset.lang);
      });
    });
  }
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".service-card, .step-item, .center-card").forEach((el) => {
    observer.observe(el)
  })
}

function setupCounterAnimations() {
  const counters = document.querySelectorAll(".stat-number")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          animateCounter(entry.target)
          entry.target.classList.add("counted")
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element) {
  const target = Number.parseInt(element.dataset.target)
  const duration = 2000
  const start = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const current = Math.floor(target * easeOutCubic(progress))

    element.textContent = current.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  requestAnimationFrame(updateCounter)
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function openServiceModal(serviceType) {
  const modal = document.getElementById("serviceModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  const serviceData = serviceModalContent[serviceType]

  modalTitle.textContent = serviceData.title
  modalBody.innerHTML = serviceData.content

  modal.style.display = "block"
  document.body.style.overflow = "hidden"

  // Setup form submission
  const form = modalBody.querySelector("form")
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      handleServiceFormSubmission(form, serviceType)
    })
  }
}

function closeModal() {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    modal.style.display = "none"
  })
  document.body.style.overflow = "auto"
}

function handleServiceFormSubmission(form, serviceType) {
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // Create volunteer record
  const volunteer = {
    id: Date.now(),
    name: data.fullName || data.name || 'Anonymous',
    serviceType: serviceType,
    phone: data.phone || '',
    email: data.email || '',
    address: data.address || '',
    registrationDate: new Date().toLocaleString('vi-VN'),
    status: 'pending',
    notes: data.notes || '',
    ...data // Include all form data
  }

  // Add to volunteers array
  volunteers.push(volunteer)
  
  // Update statistics
  volunteerStats.total++
  if (volunteerStats[serviceType] !== undefined) {
    volunteerStats[serviceType]++
  }

  // Save to localStorage
  localStorage.setItem('volunteers', JSON.stringify(volunteers))
  localStorage.setItem('volunteerStats', JSON.stringify(volunteerStats))

  // Update contributions display
  updateContributionsDisplay()
  updateContributionStats()

  // Simulate form submission
  console.log(`${serviceType} form submitted:`, data)

  // Show success modal
  closeModal()
  setTimeout(() => {
    const successModal = document.getElementById("successModal")
    successModal.style.display = "block"
    document.body.style.overflow = "hidden"
  }, 300)
}

function loadSupportCenters() {
  filterAndDisplayCenters()
}

function filterAndDisplayCenters(append = false) {
  const searchTerm = document.getElementById("centerSearch")?.value.toLowerCase() || ""
  const cityFilter = document.getElementById("cityFilter")?.value || ""

  const filteredCenters = allCenters.filter((center) => {
    const matchesFilter = currentFilter === "all" || center.type === currentFilter
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm) || center.address.toLowerCase().includes(searchTerm)
    const matchesCity = !cityFilter || center.city === cityFilter

    return matchesFilter && matchesSearch && matchesCity
  })

  const startIndex = append ? (currentPage - 1) * itemsPerPage : 0
  const endIndex = currentPage * itemsPerPage
  const centersToShow = filteredCenters.slice(startIndex, endIndex)

  displayCenters(centersToShow, append)

  // Update load more button
  const loadMoreBtn = document.getElementById("loadMoreCenters")
  if (loadMoreBtn) {
    if (endIndex >= filteredCenters.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "block"
    }
  }
}

function displayCenters(centers, append = false) {
  const centersGrid = document.getElementById("centersGrid")

  if (!append) {
    centersGrid.innerHTML = ""
  }

  if (centers.length === 0 && !append) {
    centersGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Không tìm thấy trung tâm nào</h3>
                <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
        `
    return
  }

  centers.forEach((center) => {
    const centerCard = createCenterCard(center)
    centersGrid.appendChild(centerCard)
  })
}

function createCenterCard(center) {
  const card = document.createElement("div")
  card.className = "center-card"
  card.innerHTML = `
        <div class="center-header">
            <div>
                <h3 class="center-name">${center.name}</h3>
                <span class="center-type">${getTypeLabel(center.type)}</span>
            </div>
        </div>
        <div class="center-info">
            <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
            <p><i class="fas fa-phone"></i> ${center.phone}</p>
            <p><i class="fas fa-clock"></i> ${center.hours}</p>
            <p><i class="fas fa-globe"></i> ${center.website}</p>
        </div>
        <div class="center-services">
            ${center.services.map((service) => `<span class="service-tag">${service}</span>`).join("")}
        </div>
        <p class="center-description">${center.description}</p>
        <div class="center-actions">
            <button class="btn-contact" onclick="contactCenter('${center.id}')">
                <i class="fas fa-phone"></i> Liên Hệ
            </button>
            <button class="btn-directions" onclick="getDirections('${center.address}')">
                <i class="fas fa-directions"></i> Chỉ Đường
            </button>
        </div>
    `
  return card
}

function getTypeLabel(type) {
  const labels = {
    blood: "Hiến Máu",
    clothes: "Quần Áo",
    food: "Thực Phẩm",
    education: "Giáo Dục",
    medical: "Y Tế",
    emergency: "Khẩn Cấp",
  }
  return labels[type] || type
}

function contactCenter(centerId) {
  const center = allCenters.find((c) => c.id == centerId)
  if (center) {
    window.open(`tel:${center.phone}`)
  }
}

function getDirections(address) {
  const encodedAddress = encodeURIComponent(address)
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
}

function handleContactForm(e) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData.entries())

  console.log("Contact form submitted:", data)

  // Show success message
  alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.")
  e.target.reset()
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add some additional CSS for animations and modal styles
const additionalCSS = `
.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 3rem;
    color: var(--gray-600);
}

.no-results i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.modal-form .form-group {
    margin-bottom: 1rem;
}

.modal-form input,
.modal-form select,
.modal-form textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--gray-300);
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
}

.modal-form input:focus,
.modal-form select:focus,
.modal-form textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.4;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
}

.service-info {
    background: var(--gray-100);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
}

.service-info h4 {
    color: var(--dark-color);
    margin-bottom: 0.5rem;
}

.service-info ul {
    margin-left: 1rem;
    color: var(--gray-600);
}

.service-info li {
    margin-bottom: 0.25rem;
}

.center-description {
    color: var(--gray-600);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .center-actions {
        flex-direction: column;
    }
    
    .btn-contact,
    .btn-directions {
        width: 100%;
    }
}
`

// Inject additional CSS
const style = document.createElement("style")
style.textContent = additionalCSS
document.head.appendChild(style)

// Slider functionality with automatic interval
let sliderInterval;
let isSliderPaused = false;

function nextSlide() {
  let lists = document.querySelectorAll('.item-slide');
  document.getElementById('slide').appendChild(lists[0]);
}

function prevSlide() {
  let lists = document.querySelectorAll('.item-slide');
  document.getElementById('slide').prepend(lists[lists.length - 1]);
}

function startSlider() {
  if (!isSliderPaused) {
    sliderInterval = setInterval(nextSlide, 8000); // 8 seconds interval
  }
}

function pauseSlider() {
  isSliderPaused = true;
  clearInterval(sliderInterval);
}

function resumeSlider() {
  isSliderPaused = false;
  startSlider();
}

// Manual navigation
document.getElementById('next').onclick = function () {
  pauseSlider();
  nextSlide();
  setTimeout(resumeSlider, 1000); // Resume after 1 second
}

document.getElementById('prev').onclick = function () {
  pauseSlider();
  prevSlide();
  setTimeout(resumeSlider, 1000); // Resume after 1 second
}

// Pause on hover
const sliderSection = document.querySelector('.slider-section');
if (sliderSection) {
  sliderSection.addEventListener('mouseenter', pauseSlider);
  sliderSection.addEventListener('mouseleave', resumeSlider);
}

// Start automatic sliding
startSlider();

// Volunteer management functions
function updateContributionsDisplay() {
  const list = document.getElementById('contributionList');
  if (!list) return;

  // Clear existing items except example row
  const exampleRow = list.querySelector('.example-row');
  list.innerHTML = '';
  if (exampleRow) {
    list.appendChild(exampleRow);
  }

  // Add volunteer contributions
  volunteers.forEach(volunteer => {
    const div = document.createElement('div');
    div.className = 'contribution-item';
    div.style.borderLeft = `4px solid ${getServiceColor(volunteer.serviceType)}`;
    
    const serviceLabel = getServiceLabel(volunteer.serviceType);
    const contributionDesc = getContributionDescription(volunteer);
    
    div.innerHTML = `
      <div class="contribution-header">
        <span class="contributor-name"><i class="fas fa-user"></i> <b>${volunteer.name}</b></span>
        <span class="contribution-type">${serviceLabel}</span>
      </div>
      <div class="contribution-message"><b>Đã đăng ký:</b> ${contributionDesc}</div>
      <div class="contribution-time">${volunteer.registrationDate}</div>
    `;
    list.appendChild(div);
  });
}

function updateContributionStats() {
  const statsContainer = document.getElementById('contributionStats');
  if (!statsContainer) return;

  statsContainer.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
      <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #3498db;">
        <h3 style="color: #3498db; margin: 0 0 10px 0;">${volunteerStats.total}</h3>
        <p style="margin: 0; color: #666;">Tổng số tình nguyện viên</p>
      </div>
      <div style="background: #ffe5e0; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #e74c3c;">
        <h3 style="color: #e74c3c; margin: 0 0 10px 0;">${volunteerStats.blood}</h3>
        <p style="margin: 0; color: #666;">Hiến máu</p>
      </div>
      <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #9b59b6;">
        <h3 style="color: #9b59b6; margin: 0 0 10px 0;">${volunteerStats.clothes}</h3>
        <p style="margin: 0; color: #666;">Quyên góp quần áo</p>
      </div>
      <div style="background: #fff3cd; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #f39c12;">
        <h3 style="color: #f39c12; margin: 0 0 10px 0;">${volunteerStats.food}</h3>
        <p style="margin: 0; color: #666;">Hỗ trợ thực phẩm</p>
      </div>
      <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #27ae60;">
        <h3 style="color: #27ae60; margin: 0 0 10px 0;">${volunteerStats.education}</h3>
        <p style="margin: 0; color: #666;">Hỗ trợ giáo dục</p>
      </div>
      <div style="background: #ffe5e0; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #e67e22;">
        <h3 style="color: #e67e22; margin: 0 0 10px 0;">${volunteerStats.medical}</h3>
        <p style="margin: 0; color: #666;">Hỗ trợ y tế</p>
      </div>
      <div style="background: #fff3cd; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #f1c40f;">
        <h3 style="color: #f1c40f; margin: 0 0 10px 0;">${volunteerStats.emergency}</h3>
        <p style="margin: 0; color: #666;">Hỗ trợ khẩn cấp</p>
      </div>
    </div>
  `;
}

function getServiceColor(serviceType) {
  const colors = {
    blood: '#e74c3c',
    clothes: '#9b59b6',
    food: '#f39c12',
    education: '#3498db',
    medical: '#1abc9c',
    emergency: '#e67e22'
  };
  return colors[serviceType] || '#666';
}

function getServiceLabel(serviceType) {
  const labels = {
    blood: 'Hiến máu',
    clothes: 'Quyên góp quần áo',
    food: 'Hỗ trợ thực phẩm',
    education: 'Hỗ trợ giáo dục',
    medical: 'Hỗ trợ y tế',
    emergency: 'Hỗ trợ khẩn cấp'
  };
  return labels[serviceType] || serviceType;
}

function getContributionDescription(volunteer) {
  const baseDesc = getServiceLabel(volunteer.serviceType);
  let additionalInfo = '';
  
  switch(volunteer.serviceType) {
    case 'blood':
      if (volunteer.bloodType) additionalInfo = ` - Nhóm máu: ${volunteer.bloodType}`;
      if (volunteer.weight) additionalInfo += ` - Cân nặng: ${volunteer.weight}kg`;
      break;
    case 'clothes':
      if (volunteer.clothesType) additionalInfo = ` - Loại: ${volunteer.clothesType}`;
      break;
    case 'food':
      if (volunteer.foodType) additionalInfo = ` - Loại: ${volunteer.foodType}`;
      break;
    case 'education':
      if (volunteer.educationType) additionalInfo = ` - Loại: ${volunteer.educationType}`;
      break;
    case 'medical':
      if (volunteer.medicalType) additionalInfo = ` - Loại: ${volunteer.medicalType}`;
      break;
    case 'emergency':
      if (volunteer.emergencyType) additionalInfo = ` - Loại: ${volunteer.emergencyType}`;
      break;
  }
  
  return baseDesc + additionalInfo;
}

// Filter volunteers by name
function filterVolunteersByName(name) {
  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(name.toLowerCase())
  );
  
  const list = document.getElementById('contributionList');
  if (!list) return;

  // Clear existing items except example row
  const exampleRow = list.querySelector('.example-row');
  list.innerHTML = '';
  if (exampleRow) {
    list.appendChild(exampleRow);
  }

  // Add filtered volunteer contributions
  filteredVolunteers.forEach(volunteer => {
    const div = document.createElement('div');
    div.className = 'contribution-item';
    div.style.borderLeft = `4px solid ${getServiceColor(volunteer.serviceType)}`;
    
    const serviceLabel = getServiceLabel(volunteer.serviceType);
    const contributionDesc = getContributionDescription(volunteer);
    
    div.innerHTML = `
      <div class="contribution-header">
        <span class="contributor-name"><i class="fas fa-user"></i> <b>${volunteer.name}</b></span>
        <span class="contribution-type">${serviceLabel}</span>
      </div>
      <div class="contribution-message"><b>Đã đăng ký:</b> ${contributionDesc}</div>
      <div class="contribution-time">${volunteer.registrationDate}</div>
    `;
    list.appendChild(div);
  });
}

// Thêm đóng góp vào danh sách (legacy function - kept for compatibility)
function addContribution({name, type, desc, time}) {
  const list = document.getElementById('contributionList');
  const div = document.createElement('div');
  div.className = 'contribution-item';
  div.innerHTML = `
    <div class="contribution-header">
      <span class="contributor-name"><i class="fas fa-user"></i> <b>${name}</b></span>
      <span class="contribution-type">${type}</span>
    </div>
    <div class="contribution-message"><b>Đã đóng góp:</b> ${desc}</div>
    <div class="contribution-time">${time}</div>
  `;
  list.prepend(div);
}

const translations = {
  vi: {
    menu_home: "Trang Chủ",
    menu_services: "Dịch Vụ",
    menu_centers: "Trung Tâm",
    menu_about: "Về Chúng Tôi",
    menu_contact: "Liên Hệ",
    hero_title: "Kết Nối Yêu Thương",
    hero_subtitle: "Chia Sẻ Hy Vọng",
    hero_desc: "Nền tảng kết nối cộng đồng để chia sẻ yêu thương, hỗ trợ những hoàn cảnh khó khăn thông qua hiến máu, quyên góp quần áo và các hoạt động từ thiện ý nghĩa.",
    hero_btn_join: "Tham Gia Ngay",
    hero_btn_find: "Tìm Trung Tâm",
    stories_title: "Câu Chuyện Truyền Cảm Hứng",
    story1_title: "Giọt Máu Chia Sẻ – Hy Vọng Sống Lại",
    story1_desc: "Một người mẹ trẻ ở Hà Nội đã được cứu sống nhờ những giọt máu hiến tặng từ cộng đồng. Câu chuyện của chị đã lan tỏa tinh thần sẻ chia, giúp nhiều người nhận ra giá trị của việc hiến máu nhân đạo.",
    images_title: "Hình Ảnh Hoạt Động",
    images_desc: "Những khoảnh khắc đẹp từ các hoạt động thiện nguyện của cộng đồng",
    image1_title: "Nắng Yêu Thương",
    image1_desc: "Những khoảnh khắc ấm áp khi cộng đồng cùng nhau chia sẻ và hỗ trợ những người có hoàn cảnh khó khăn.",
    services_title: "Dịch Vụ Từ Thiện",
    services_desc: "Chúng tôi cung cấp nhiều hình thức hỗ trợ cộng đồng khác nhau",
    service_blood_title: "Hiến Máu Nhân Đạo",
    service_blood_desc: "Tham gia hiến máu cứu người, mang lại hy vọng cho những bệnh nhân .",
    service_blood_free: "Miễn phí",
    service_blood_safe: "An toàn",
    service_blood_meaning: "Ý nghĩa",
    service_blood_btn: "Đăng Ký Hiến Máu",
    centers_title: "Trung Tâm Hỗ Trợ",
    centers_desc: "Danh sách các trung tâm từ thiện và hỗ trợ cộng đồng trên toàn quốc",
    centers_filter_all: "Tất Cả",
    centers_filter_blood: "Hiến Máu",
    centers_filter_clothes: "Quần Áo",
    centers_filter_food: "Thực Phẩm",
    centers_filter_medical: "Y Tế",
    centers_filter_education: "Giáo Dục",
    centers_search_placeholder: "Tìm kiếm trung tâm theo tên hoặc địa chỉ...",
    centers_city_placeholder: "Chọn tỉnh/thành phố",
    contributions_title: "Thống Kê Chi Tiết Đóng Góp",
    contributions_desc: "Xem thống kê chi tiết, tìm kiếm theo tên người đóng góp và xem từng đóng góp cụ thể.",
    contributions_search_placeholder: "Tìm kiếm theo tên người đóng góp...",
    situation_title: "Chia Sẻ Hoàn Cảnh Cần Giúp Đỡ",
    situation_desc: "Hãy chia sẻ hoàn cảnh khó khăn hoặc câu chuyện bạn biết để cộng đồng cùng chung tay hỗ trợ!",
    situation_name_placeholder: "Tên của bạn hoặc người cần giúp đỡ *",
    situation_message_placeholder: "Chia sẻ hoàn cảnh, câu chuyện... *",
    situation_btn: "Gửi Chia Sẻ",
    how_title: "Cách Thức Hoạt Động",
    how_desc: "Quy trình đơn giản để tham gia các hoạt động từ thiện",
    how_step1_title: "Đăng Ký Tham Gia",
    how_step1_desc: "Chọn loại hình hỗ trợ và đăng ký thông tin cá nhân",
    about_title: "Về Cộng Đồng Yêu Thương",
    about_desc: "Chúng tôi là nền tảng kết nối cộng đồng, tạo cầu nối giữa những người muốn giúp đỡ và những người cần được hỗ trợ. Với sứ mệnh lan tỏa yêu thương và chia sẻ hy vọng, chúng tôi đã và đang góp phần xây dựng một xã hội tốt đẹp hơn.",
    about_feature1: "Minh bạch và đáng tin cậy",
    about_feature2: "Cộng đồng rộng lớn",
    about_feature3: "Hoạt động vì cộng đồng",
    contact_title: "Liên Hệ Với Chúng Tôi",
    contact_desc: "Hãy liên hệ để được hỗ trợ hoặc tham gia các hoạt động từ thiện",
    contact_address_label: "Địa Chỉ",
    contact_address: "123 Đường Yêu Thương, Quận 1, TP. Hồ Chí Minh",
    contact_phone_label: "Điện Thoại",
    contact_phone: "+84 123 456 789",
    contact_email_label: "Email",
    contact_email: "info@congdongyeuthuong.vn",
    contact_time_label: "Giờ Làm Việc",
    contact_time: "Thứ 2 - Chủ Nhật: 8:00 - 18:00",
    contact_name_placeholder: "Họ và tên",
    contact_email_placeholder: "Email",
    contact_phone_placeholder: "Số điện thoại",
    contact_subject_placeholder: "Chọn chủ đề",
    contact_subject_volunteer: "Tình nguyện viên",
    contact_subject_donation: "Quyên góp",
    contact_subject_support: "Cần hỗ trợ",
    contact_subject_partnership: "Hợp tác",
    contact_subject_other: "Khác",
    contact_message_placeholder: "Tin nhắn",
    contact_btn: "Gửi Tin Nhắn",
    footer_title: "Cộng Đồng Yêu Thương",
    footer_desc: "Kết nối yêu thương, chia sẻ hy vọng. Cùng nhau xây dựng một cộng đồng tốt đẹp hơn.",
    footer_services_title: "Dịch Vụ",
    footer_service_blood: "Hiến Máu",
    footer_service_clothes: "Quyên Góp Quần Áo",
    footer_service_food: "Hỗ Trợ Thực Phẩm",
    footer_service_education: "Hỗ Trợ Giáo Dục",
    footer_service_medical: "Hỗ Trợ Y Tế",
    footer_info_title: "Thông Tin",
    footer_info_about: "Về Chúng Tôi",
    footer_info_centers: "Trung Tâm",
    footer_info_contact: "Liên Hệ",
    footer_info_news: "Tin Tức",
    footer_info_faq: "Câu Hỏi Thường Gặp",
    footer_contact_title: "Liên Hệ",
    footer_contact_address: "123 Đ.Yêu Thương, Q1, TP.HCM",
    footer_contact_phone: "+84 123 456 789",
    footer_contact_email: "info@congdongyeuthuong.vn",
    footer_copyright: "© 2024 Cộng Đồng Yêu Thương. Tất cả quyền được bảo lưu.",
    // Slider section
    slider_medical_title: "Hỗ Trợ Y Tế",
    slider_medical_desc: "Hỗ trợ chi phí khám chữa bệnh và thuốc men cho người nghèo.",
    slider_education_title: "Hỗ Trợ Giáo Dục",
    slider_education_desc: "Cung cấp học bổng, sách vở và dụng cụ học tập cho trẻ em có hoàn cảnh khó khăn.",
    slider_food_title: "Hỗ Trợ Thực Phẩm",
    slider_food_desc: "Cung cấp bữa ăn miễn phí và thực phẩm thiết yếu cho người nghèo.",
    slider_clothes_title: "Quyên Góp Quần Áo",
    slider_clothes_desc: "Thu gom và phân phối quần áo cũ đến những người có hoàn cảnh khó khăn.",
    slider_blood_title: "Hiến Máu Nhân Đạo",
    slider_blood_desc: "Tham gia hiến máu cứu người, mang lại hy vọng cho những bệnh nhân cần được giúp đỡ.",
    slider_emergency_title: "Hỗ Trợ Khẩn Cấp",
    slider_emergency_desc: "Hỗ trợ nhanh chóng trong các tình huống khẩn cấp, thiên tai.",
    slider_btn: "Xem thêm",
    slider_prev: "<",
    slider_next: ">",
    // Hero stats
    hero_stat_participants: "Người Tham Gia",
    hero_stat_blood: "Lần Hiến Máu",
    hero_stat_gifts: "Món Quà Tặng",
    // Stories
    story_coat_title: "Chiếc Áo Ấm Vùng Cao",
    story_coat_desc: "Mùa đông lạnh giá, những chiếc áo cũ được quyên góp từ thành phố đã đến với các em nhỏ vùng cao. Nụ cười rạng rỡ trên gương mặt các em là động lực để mọi người tiếp tục hành trình thiện nguyện.",
    story_trip_title: "Bữa Cơm Nghĩa Tình",
    story_trip_desc: "Tại một trung tâm hỗ trợ, mỗi ngày hàng trăm suất cơm miễn phí được trao tận tay người vô gia cư. Những bữa cơm giản dị nhưng ấm áp tình người, giúp họ vơi bớt khó khăn.",
    story_education_title: "Học Bổng Cho Em",
    story_education_desc: "Một học sinh nghèo vượt khó ở miền Trung đã nhận được học bổng và sách vở từ chương trình thiện nguyện. Nhờ đó, em tiếp tục nuôi dưỡng ước mơ đến trường và vươn lên trong học tập.",
    story_medical_title: "Chuyến Xe Yêu Thương",
    story_medical_desc: "Những chuyến xe chở đầy thuốc men, vật tư y tế đã kịp thời đến với bà con vùng lũ. Sự hỗ trợ nhanh chóng giúp nhiều người vượt qua bệnh tật và thiên tai.",
    story_emergency_title: "Cánh Tay Nối Dài Trong Khẩn Cấp",
    story_emergency_desc: "Khi một gia đình gặp hỏa hoạn, cộng đồng đã cùng nhau quyên góp, hỗ trợ chỗ ở tạm thời và vật dụng thiết yếu. Sự đoàn kết đã giúp họ sớm ổn định lại cuộc sống.",
    story_clothes_title: "Ước Mơ Được Đến Trường",
    story_clothes_desc: "Một nhóm bạn trẻ đã quyên góp sách vở, dụng cụ học tập cho trẻ em vùng sâu vùng xa, giúp các em có cơ hội tiếp tục học tập và phát triển.",
    story_volunteer_title: "Trồng Cây Gây Rừng",
    story_volunteer_desc: "Hàng trăm tình nguyện viên đã cùng nhau trồng cây xanh tại vùng đất trống, góp phần bảo vệ môi trường và chống biến đổi khí hậu.",
    story_food_title: "Thắp Sáng Bản Làng",
    story_food_desc: "Những chiếc đèn năng lượng mặt trời được trao tặng cho các bản làng chưa có điện, mang lại ánh sáng và niềm vui cho mọi người.",
    story_water_title: "Nước Sạch Cho Bản Xa",
    story_water_desc: "Những giếng nước sạch được xây dựng nhờ sự đóng góp của cộng đồng, giúp người dân vùng cao có nước sạch sinh hoạt hàng ngày.",
    story_birthday_title: "Bữa Tiệc Sinh Nhật Đặc Biệt",
    story_birthday_desc: "Các em nhỏ mồ côi lần đầu tiên được tổ chức sinh nhật chung, nhận quà và lời chúc từ cộng đồng, cảm nhận được sự quan tâm, yêu thương.",
    story_animal_title: "Chung Tay Bảo Vệ Động Vật",
    story_animal_desc: "Một chiến dịch cứu trợ động vật bị bỏ rơi đã giúp nhiều chú chó, mèo tìm được mái ấm mới và nhận được sự chăm sóc tận tình.",
    // Images
    image2_title: "chuyến đi Thanh Xuân",
    image2_desc: "Sức mạnh của sự đoàn kết khi mọi người cùng chung tay vì một mục tiêu cao đẹp.",
    image3_title: "chuyến đi Thanh Xuân",
    image3_desc: "Mỗi hành động nhỏ đều mang lại niềm vui và hy vọng cho những người cần được giúp đỡ.",
    // Services
    service_clothes_title: "Quyên Góp Quần Áo",
    service_clothes_desc: "Thu gom và phân phối quần áo cũ đến những người có hoàn cảnh khó khăn.",
    service_clothes_reuse: "Tái sử dụng",
    service_clothes_env: "Môi trường",
    service_clothes_share: "Chia sẻ",
    service_clothes_btn: "Đóng Góp Ngay",
    service_food_title: "Hỗ Trợ Thực Phẩm",
    service_food_desc: "Cung cấp bữa ăn miễn phí và thực phẩm thiết yếu cho người nghèo.",
    service_food_nutrition: "Dinh dưỡng",
    service_food_daily: "Hàng ngày",
    service_food_free: "Miễn phí",
    service_food_btn: "Hỗ Trợ Ngay",
    service_education_title: "Hỗ Trợ Giáo Dục",
    service_education_desc: "Cung cấp học bổng, hỗ trợ học tập cho trẻ em có hoàn cảnh khó khăn.",
    service_education_scholarship: "Học bổng",
    service_education_books: "Sách vở",
    service_education_future: "Tương lai",
    service_education_btn: "Hỗ Trợ Học Tập",
    service_medical_title: "Hỗ Trợ Y Tế",
    service_medical_desc: "Hỗ trợ chi phí khám chữa bệnh và thuốc men cho người nghèo.",
    service_medical_exam: "Khám bệnh",
    service_medical_health: "Y tế",
    service_medical_care: "Sức khỏe",
    service_medical_btn: "Hỗ Trợ Y Tế",
    service_emergency_title: "Hỗ Trợ Khẩn Cấp",
    service_emergency_desc: "Hỗ trợ nhanh chóng trong các tình huống khẩn cấp, thiên tai.",
    service_emergency_fast: "Nhanh chóng",
    service_emergency_urgent: "Khẩn cấp",
    service_emergency_effective: "Hiệu quả",
    service_emergency_btn: "Hỗ Trợ Khẩn Cấp",
    // How it works
    how_step2_title: "Xác Nhận Thông Tin",
    how_step2_desc: "Chúng tôi sẽ liên hệ xác nhận và hướng dẫn chi tiết",
    how_step3_title: "Tham Gia Hoạt Động",
    how_step3_desc: "Đến trung tâm hoặc địa điểm được chỉ định để thực hiện",
    how_step3_btn: "Đóng Góp Ngay",
    how_step4_title: "Theo Dõi Kết Quả",
    how_step4_desc: "Nhận thông tin về tác động và kết quả của hoạt động",
    // Centers
    centers_load_more: "Xem Thêm Trung Tâm",
    // Contributions
    contribution_example: "Ví dụ: Nguyễn Văn A",
    contribution_cash: "Tiền mặt",
    contribution_cash_desc: "Đã đóng góp: Tiền mặt - 500.000 VNĐ cho trẻ em vùng cao",
    contribution_time: "01/06/2024 10:00:00",
    // Modals
    modal_title: "Đăng Ký Dịch Vụ",
    modal_close: "×",
    success_title: "Đăng Ký Thành Công!",
    success_desc: "Cảm ơn bạn đã tham gia. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
    success_btn: "Đóng",
    // Login/Register
    login_title: "Đăng nhập",
    login_email_label: "Email hoặc SĐT",
    login_email_placeholder: "Email hoặc SĐT",
    login_password_label: "Mật khẩu",
    login_password_placeholder: "Mật khẩu",
    login_btn: "Đăng nhập",
    login_forgot: "Quên mật khẩu?",
    login_to_register: "Chưa có tài khoản? Đăng ký",
    register_title: "Đăng ký tài khoản",
    register_name_label: "Họ và tên",
    register_name_placeholder: "Họ và tên",
    register_email_label: "Email hoặc SĐT",
    register_email_placeholder: "Email hoặc SĐT",
    register_password_label: "Mật khẩu",
    register_password_placeholder: "Mật khẩu",
    register_confirm_label: "Xác nhận mật khẩu",
    register_confirm_placeholder: "Xác nhận mật khẩu",
    register_btn: "Đăng ký",
    register_to_login: "Đã có tài khoản? Đăng nhập",
    chatbot_title: "Tư vấn & Giải đáp thắc mắc",
  },
  en: {
    menu_home: "Home",
    menu_services: "Services",
    menu_centers: "Centers",
    menu_about: "About Us",
    menu_contact: "Contact",
    hero_title: "Connecting Love",
    hero_subtitle: "Sharing Hope",
    hero_desc: "A platform connecting the community to share love, support those in need through blood donation, clothing donation, and meaningful charity activities.",
    hero_btn_join: "Join Now",
    hero_btn_find: "Find Center",
    stories_title: "Inspiring Stories",
    story1_title: "Shared Blood – Hope Revived",
    story1_desc: "A young mother in Hanoi was saved thanks to blood donations from the community. Her story spread the spirit of sharing, helping many realize the value of humanitarian blood donation.",
    images_title: "Activity Images",
    images_desc: "Beautiful moments from the community's charity activities",
    image1_title: "Sunshine of Love",
    image1_desc: "Warm moments when the community comes together to share and support those in need.",
    services_title: "Charity Services",
    services_desc: "We provide various forms of community support",
    service_blood_title: "Humanitarian Blood Donation",
    service_blood_desc: "Participate in blood donation to save lives and bring hope to patients.",
    service_blood_free: "Free",
    service_blood_safe: "Safe",
    service_blood_meaning: "Meaningful",
    service_blood_btn: "Register to Donate Blood",
    centers_title: "Support Centers",
    centers_desc: "List of charity and community support centers nationwide",
    centers_filter_all: "All",
    centers_filter_blood: "Blood Donation",
    centers_filter_clothes: "Clothes",
    centers_filter_food: "Food",
    centers_filter_medical: "Medical",
    centers_filter_education: "Education",
    centers_search_placeholder: "Search centers by name or address...",
    centers_city_placeholder: "Select city/province",
    contributions_title: "Detailed Contribution Statistics",
    contributions_desc: "View detailed statistics, search by contributor name, and see each specific contribution.",
    contributions_search_placeholder: "Search by contributor name...",
    situation_title: "Share Needy Situations",
    situation_desc: "Share difficult situations or stories you know so the community can join hands to help!",
    situation_name_placeholder: "Your name or the person in need *",
    situation_message_placeholder: "Share the situation, story... *",
    situation_btn: "Send Share",
    how_title: "How It Works",
    how_desc: "Simple process to participate in charity activities",
    how_step1_title: "Register to Participate",
    how_step1_desc: "Choose the type of support and register your personal information",
    about_title: "About Loving Community",
    about_desc: "We are a platform connecting the community, bridging those who want to help and those in need. With the mission to spread love and share hope, we are contributing to building a better society.",
    about_feature1: "Transparent and trustworthy",
    about_feature2: "Large community",
    about_feature3: "Community-oriented activities",
    contact_title: "Contact Us",
    contact_desc: "Contact us for support or to participate in charity activities",
    contact_address_label: "Address",
    contact_address: "123 Love Street, District 1, Ho Chi Minh City",
    contact_phone_label: "Phone",
    contact_phone: "+84 123 456 789",
    contact_email_label: "Email",
    contact_email: "info@congdongyeuthuong.vn",
    contact_time_label: "Working Hours",
    contact_time: "Monday - Sunday: 8:00 - 18:00",
    contact_name_placeholder: "Full name",
    contact_email_placeholder: "Email",
    contact_phone_placeholder: "Phone number",
    contact_subject_placeholder: "Select subject",
    contact_subject_volunteer: "Volunteer",
    contact_subject_donation: "Donation",
    contact_subject_support: "Need support",
    contact_subject_partnership: "Partnership",
    contact_subject_other: "Other",
    contact_message_placeholder: "Message",
    contact_btn: "Send Message",
    footer_title: "Loving Community",
    footer_desc: "Connecting love, sharing hope. Let's build a better community together.",
    footer_services_title: "Services",
    footer_service_blood: "Blood Donation",
    footer_service_clothes: "Clothes Donation",
    footer_service_food: "Food Support",
    footer_service_education: "Education Support",
    footer_service_medical: "Medical Support",
    footer_info_title: "Information",
    footer_info_about: "About Us",
    footer_info_centers: "Centers",
    footer_info_contact: "Contact",
    footer_info_news: "News",
    footer_info_faq: "FAQ",
    footer_contact_title: "Contact",
    footer_contact_address: "123 Love St, D1, HCMC",
    footer_contact_phone: "+84 123 456 789",
    footer_contact_email: "info@congdongyeuthuong.vn",
    footer_copyright: "© 2024 Loving Community. All rights reserved.",
    // Slider section
    slider_medical_title: "Medical Support",
    slider_medical_desc: "Support medical examination costs and medicine for the poor.",
    slider_education_title: "Education Support",
    slider_education_desc: "Provide scholarships, books and learning tools for children in difficult circumstances.",
    slider_food_title: "Food Support",
    slider_food_desc: "Provide free meals and essential food for the poor.",
    slider_clothes_title: "Clothes Donation",
    slider_clothes_desc: "Collect and distribute used clothes to people in difficult circumstances.",
    slider_blood_title: "Humanitarian Blood Donation",
    slider_blood_desc: "Participate in blood donation to save lives, bringing hope to patients in need.",
    slider_emergency_title: "Emergency Support",
    slider_emergency_desc: "Quick support in emergency situations and natural disasters.",
    slider_btn: "See more",
    slider_prev: "<",
    slider_next: ">",
    // Hero stats
    hero_stat_participants: "Participants",
    hero_stat_blood: "Blood Donations",
    hero_stat_gifts: "Gifts Given",
    // Stories
    story_coat_title: "Warm Coats for Highland Children",
    story_coat_desc: "In the cold winter, old clothes donated from the city reached the children in the highlands. The bright smiles on their faces motivate everyone to continue their charity journey.",
    story_trip_title: "Meals of Compassion",
    story_trip_desc: "At a support center, hundreds of free meals are delivered daily to homeless people. Simple but warm meals help them ease their difficulties.",
    story_education_title: "Scholarship for Children",
    story_education_desc: "A poor student overcoming difficulties in Central Vietnam received a scholarship and books from the charity program. Thanks to this, he continues to nurture his dream of going to school and excels in his studies.",
    story_medical_title: "Love Caravan",
    story_medical_desc: "Trucks full of medicine and medical supplies arrived in time for flood victims. Quick support helped many people overcome illness and natural disasters.",
    story_emergency_title: "Extended Helping Hands in Emergencies",
    story_emergency_desc: "When a family faced a fire, the community came together to donate, provide temporary shelter and essential items. Unity helped them stabilize their lives quickly.",
    story_clothes_title: "Dream of Going to School",
    story_clothes_desc: "A group of young people donated books and learning tools for children in remote areas, helping them have the opportunity to continue studying and developing.",
    story_volunteer_title: "Planting Trees for Forests",
    story_volunteer_desc: "Hundreds of volunteers planted green trees in empty areas, contributing to environmental protection and combating climate change.",
    story_food_title: "Lighting Up Villages",
    story_food_desc: "Solar lamps were donated to villages without electricity, bringing light and joy to everyone.",
    story_water_title: "Clean Water for Remote Villages",
    story_water_desc: "Clean wells were built thanks to community contributions, helping highland people have clean water for daily use.",
    story_birthday_title: "Special Birthday Party",
    story_birthday_desc: "Orphaned children had their first joint birthday party, receiving gifts and wishes from the community, feeling the care and love.",
    story_animal_title: "Join Hands to Protect Animals",
    story_animal_desc: "A campaign to rescue abandoned animals helped many dogs and cats find new homes and receive dedicated care.",
    // Images
    image2_title: "Thanh Xuan Journey",
    image2_desc: "The power of unity when everyone joins hands for a noble goal.",
    image3_title: "Thanh Xuan Journey",
    image3_desc: "Every small action brings joy and hope to those in need.",
    // Services
    service_clothes_title: "Clothes Donation",
    service_clothes_desc: "Collect and distribute used clothes to people in difficult circumstances.",
    service_clothes_reuse: "Reuse",
    service_clothes_env: "Environment",
    service_clothes_share: "Share",
    service_clothes_btn: "Donate Now",
    service_food_title: "Food Support",
    service_food_desc: "Provide free meals and essential food for the poor.",
    service_food_nutrition: "Nutrition",
    service_food_daily: "Daily",
    service_food_free: "Free",
    service_food_btn: "Support Now",
    service_education_title: "Education Support",
    service_education_desc: "Provide scholarships and learning support for children in difficult circumstances.",
    service_education_scholarship: "Scholarship",
    service_education_books: "Books",
    service_education_future: "Future",
    service_education_btn: "Support Education",
    service_medical_title: "Medical Support",
    service_medical_desc: "Support medical examination costs and medicine for the poor.",
    service_medical_exam: "Medical exam",
    service_medical_health: "Health",
    service_medical_care: "Healthcare",
    service_medical_btn: "Medical Support",
    service_emergency_title: "Emergency Support",
    service_emergency_desc: "Quick support in emergency situations and natural disasters.",
    service_emergency_fast: "Fast",
    service_emergency_urgent: "Urgent",
    service_emergency_effective: "Effective",
    service_emergency_btn: "Emergency Support",
    // How it works
    how_step2_title: "Confirm Information",
    how_step2_desc: "We will contact to confirm and provide detailed guidance",
    how_step3_title: "Participate in Activities",
    how_step3_desc: "Go to the center or designated location to perform",
    how_step3_btn: "Donate Now",
    how_step4_title: "Track Results",
    how_step4_desc: "Receive information about the impact and results of activities",
    // Centers
    centers_load_more: "Load More Centers",
    // Contributions
    contribution_example: "Example: Nguyen Van A",
    contribution_cash: "Cash",
    contribution_cash_desc: "Contributed: Cash - 500,000 VND for highland children",
    contribution_time: "01/06/2024 10:00:00",
    // Modals
    modal_title: "Service Registration",
    modal_close: "×",
    success_title: "Registration Successful!",
    success_desc: "Thank you for participating. We will contact you soon.",
    success_btn: "Close",
    // Login/Register
    login_title: "Login",
    login_email_label: "Email or Phone",
    login_email_placeholder: "Email or Phone",
    login_password_label: "Password",
    login_password_placeholder: "Password",
    login_btn: "Login",
    login_forgot: "Forgot password?",
    login_to_register: "Don't have an account? Register",
    register_title: "Register Account",
    register_name_label: "Full Name",
    register_name_placeholder: "Full Name",
    register_email_label: "Email or Phone",
    register_email_placeholder: "Email or Phone",
    register_password_label: "Password",
    register_password_placeholder: "Password",
    register_confirm_label: "Confirm Password",
    register_confirm_placeholder: "Confirm Password",
    register_btn: "Register",
    register_to_login: "Already have an account? Login",
    chatbot_title: "Q&A & Consultation",
  },
  zh: {
    menu_home: "主页",
    menu_services: "服务",
    menu_centers: "中心",
    menu_about: "关于我们",
    menu_contact: "联系",
    hero_title: "连接爱心",
    hero_subtitle: "分享希望",
    hero_desc: "一个连接社区的平台，通过献血、捐赠衣物和有意义的慈善活动来分享爱心，帮助有需要的人。",
    hero_btn_join: "立即加入",
    hero_btn_find: "查找中心",
    stories_title: "感人故事",
    story1_title: "分享的血液——重燃希望",
    story1_desc: "一位年轻母亲因社区的献血而获救。她的故事传播了分享精神，帮助许多人认识到无偿献血的价值。",
    images_title: "活动图片",
    images_desc: "社区慈善活动中的美好瞬间",
    image1_title: "爱的阳光",
    image1_desc: "社区成员齐心协力，温暖地帮助有需要的人们的瞬间。",
    services_title: "慈善服务",
    services_desc: "我们提供多种社区支持形式",
    service_blood_title: "无偿献血",
    service_blood_desc: "参与献血，拯救生命，为患者带来希望。",
    service_blood_free: "免费",
    service_blood_safe: "安全",
    service_blood_meaning: "有意义",
    service_blood_btn: "注册献血",
    centers_title: "支持中心",
    centers_desc: "全国慈善和社区支持中心名单",
    centers_filter_all: "全部",
    centers_filter_blood: "献血",
    centers_filter_clothes: "衣物",
    centers_filter_food: "食品",
    centers_filter_medical: "医疗",
    centers_filter_education: "教育",
    centers_search_placeholder: "按名称或地址搜索中心...",
    centers_city_placeholder: "选择省/市",
    contributions_title: "详细捐赠统计",
    contributions_desc: "查看详细统计，通过捐赠者姓名搜索并查看每一项捐赠。",
    contributions_search_placeholder: "按捐赠者姓名搜索...",
    situation_title: "分享需要帮助的情况",
    situation_desc: "请分享您知道的困难情况或故事，让社区共同伸出援手！",
    situation_name_placeholder: "您的姓名或需要帮助的人 *",
    situation_message_placeholder: "分享情况、故事... *",
    situation_btn: "提交分享",
    how_title: "运作方式",
    how_desc: "参与慈善活动的简单流程",
    how_step1_title: "注册参与",
    how_step1_desc: "选择支持类型并填写个人信息",
    about_title: "关于爱心社区",
    about_desc: "我们是一个连接社区的平台，搭建愿意帮助者与需要帮助者之间的桥梁。以传播爱心和希望为使命，我们正在为建设更美好的社会贡献力量。",
    about_feature1: "透明可信",
    about_feature2: "庞大社区",
    about_feature3: "以社区为本的活动",
    contact_title: "联系我们",
    contact_desc: "如需支持或参与慈善活动，请联系我们",
    contact_address_label: "地址",
    contact_address: "123 爱心路，第一郡，胡志明市",
    contact_phone_label: "电话",
    contact_phone: "+84 123 456 789",
    contact_email_label: "邮箱",
    contact_email: "info@congdongyeuthuong.vn",
    contact_time_label: "工作时间",
    contact_time: "周一至周日：8:00 - 18:00",
    contact_name_placeholder: "姓名",
    contact_email_placeholder: "邮箱",
    contact_phone_placeholder: "电话号码",
    contact_subject_placeholder: "选择主题",
    contact_subject_volunteer: "志愿者",
    contact_subject_donation: "捐赠",
    contact_subject_support: "需要支持",
    contact_subject_partnership: "合作",
    contact_subject_other: "其他",
    contact_message_placeholder: "留言",
    contact_btn: "发送信息",
    footer_title: "爱心社区",
    footer_desc: "连接爱心，分享希望。让我们共同建设更美好的社区。",
    footer_services_title: "服务",
    footer_service_blood: "献血",
    footer_service_clothes: "衣物捐赠",
    footer_service_food: "食品支持",
    footer_service_education: "教育支持",
    footer_service_medical: "医疗支持",
    footer_info_title: "信息",
    footer_info_about: "关于我们",
    footer_info_centers: "中心",
    footer_info_contact: "联系",
    footer_info_news: "新闻",
    footer_info_faq: "常见问题",
    footer_contact_title: "联系",
    footer_contact_address: "123 爱心路，第一郡，胡志明市",
    footer_contact_phone: "+84 123 456 789",
    footer_contact_email: "info@congdongyeuthuong.vn",
    footer_copyright: "© 2024 爱心社区。保留所有权利。",
    // Slider section
    slider_medical_title: "医疗支持",
    slider_medical_desc: "为贫困人口提供医疗检查和药物费用支持。",
    slider_education_title: "教育支持",
    slider_education_desc: "为困难儿童提供奖学金、书籍和学习用品。",
    slider_food_title: "食品支持",
    slider_food_desc: "为贫困人口提供免费餐食和基本食品。",
    slider_clothes_title: "衣物捐赠",
    slider_clothes_desc: "收集和分发旧衣物给有困难的人。",
    slider_blood_title: "人道献血",
    slider_blood_desc: "参与献血救人，为需要的患者带来希望。",
    slider_emergency_title: "紧急支持",
    slider_emergency_desc: "在紧急情况和自然灾害中快速提供支持。",
    slider_btn: "查看更多",
    slider_prev: "<",
    slider_next: ">",
    // Hero stats
    hero_stat_participants: "参与者",
    hero_stat_blood: "献血次数",
    hero_stat_gifts: "礼物数量",
    // Stories
    story_coat_title: "高原儿童的温暖外套",
    story_coat_desc: "寒冷的冬天，从城市捐赠的旧衣物到达了高原的孩子们。他们脸上的灿烂笑容激励着每个人继续慈善之旅。",
    story_trip_title: "爱心餐食",
    story_trip_desc: "在支持中心，每天向无家可归者提供数百份免费餐食。简单而温暖的餐食帮助他们缓解困难。",
    story_education_title: "儿童奖学金",
    story_education_desc: "越南中部一个克服困难的贫困学生从慈善项目获得了奖学金和书籍。多亏了这个，他继续培养上学梦想并在学习中脱颖而出。",
    story_medical_title: "爱心车队",
    story_medical_desc: "满载药品和医疗用品的卡车及时到达洪水灾区。快速支持帮助许多人克服疾病和自然灾害。",
    story_emergency_title: "紧急情况下的援助之手",
    story_emergency_desc: "当一个家庭面临火灾时，社区团结起来捐赠，提供临时住所和必需品。团结帮助他们快速稳定生活。",
    story_clothes_title: "上学的梦想",
    story_clothes_desc: "一群年轻人向偏远地区的儿童捐赠书籍和学习用品，帮助他们有机会继续学习和发展。",
    story_volunteer_title: "植树造林",
    story_volunteer_desc: "数百名志愿者在空地上种植绿树，为环境保护和应对气候变化做出贡献。",
    story_food_title: "点亮村庄",
    story_food_desc: "太阳能灯被捐赠给没有电的村庄，为每个人带来光明和欢乐。",
    story_water_title: "偏远村庄的清洁水",
    story_water_desc: "感谢社区贡献建造了清洁水井，帮助高原人民获得日常使用的清洁水。",
    story_birthday_title: "特别的生日派对",
    story_birthday_desc: "孤儿儿童第一次举办联合生日派对，收到社区的礼物和祝福，感受到关心和爱。",
    story_animal_title: "携手保护动物",
    story_animal_desc: "一项救助被遗弃动物的运动帮助许多狗和猫找到新家并获得悉心照料。",
    // Images
    image2_title: "青春之旅",
    image2_desc: "当大家为一个崇高目标携手时团结的力量。",
    image3_title: "青春之旅",
    image3_desc: "每一个小行动都为需要帮助的人带来欢乐和希望。",
    // Services
    service_clothes_title: "衣物捐赠",
    service_clothes_desc: "收集和分发旧衣物给有困难的人。",
    service_clothes_reuse: "再利用",
    service_clothes_env: "环境",
    service_clothes_share: "分享",
    service_clothes_btn: "立即捐赠",
    service_food_title: "食品支持",
    service_food_desc: "为贫困人口提供免费餐食和基本食品。",
    service_food_nutrition: "营养",
    service_food_daily: "日常",
    service_food_free: "免费",
    service_food_btn: "立即支持",
    service_education_title: "教育支持",
    service_education_desc: "为困难儿童提供奖学金和学习支持。",
    service_education_scholarship: "奖学金",
    service_education_books: "书籍",
    service_education_future: "未来",
    service_education_btn: "支持教育",
    service_medical_title: "医疗支持",
    service_medical_desc: "为贫困人口提供医疗检查和药物费用支持。",
    service_medical_exam: "体检",
    service_medical_health: "健康",
    service_medical_care: "医疗保健",
    service_medical_btn: "医疗支持",
    service_emergency_title: "紧急支持",
    service_emergency_desc: "在紧急情况和自然灾害中快速提供支持。",
    service_emergency_fast: "快速",
    service_emergency_urgent: "紧急",
    service_emergency_effective: "有效",
    service_emergency_btn: "紧急支持",
    // How it works
    how_step2_title: "确认信息",
    how_step2_desc: "我们将联系确认并提供详细指导",
    how_step3_title: "参与活动",
    how_step3_desc: "前往中心或指定地点执行",
    how_step3_btn: "立即捐赠",
    how_step4_title: "跟踪结果",
    how_step4_desc: "接收有关活动影响和结果的信息",
    // Centers
    centers_load_more: "加载更多中心",
    // Contributions
    contribution_example: "示例：阮文A",
    contribution_cash: "现金",
    contribution_cash_desc: "已贡献：现金 - 500,000越南盾用于高原儿童",
    contribution_time: "01/06/2024 10:00:00",
    // Modals
    modal_title: "服务注册",
    modal_close: "×",
    success_title: "注册成功！",
    success_desc: "感谢您的参与。我们将尽快与您联系。",
    success_btn: "关闭",
    // Login/Register
    login_title: "登录",
    login_email_label: "邮箱或电话",
    login_email_placeholder: "邮箱或电话",
    login_password_label: "密码",
    login_password_placeholder: "密码",
    login_btn: "登录",
    login_forgot: "忘记密码？",
    login_to_register: "没有账户？注册",
    register_title: "注册账户",
    register_name_label: "姓名",
    register_name_placeholder: "姓名",
    register_email_label: "邮箱或电话",
    register_email_placeholder: "邮箱或电话",
    register_password_label: "密码",
    register_password_placeholder: "密码",
    register_confirm_label: "确认密码",
    register_confirm_placeholder: "确认密码",
    register_btn: "注册",
    register_to_login: "已有账户？登录",
    chatbot_title: "咨询与答疑",
  },
  ja: {
    menu_home: "ホーム",
    menu_services: "サービス",
    menu_centers: "センター",
    menu_about: "私たちについて",
    menu_contact: "連絡先",
    hero_title: "愛をつなぐ",
    hero_subtitle: "希望を分かち合う",
    hero_desc: "献血、衣類の寄付、意義ある慈善活動を通じて、愛を分かち合い、困っている人々を支援するコミュニティプラットフォーム。",
    hero_btn_join: "今すぐ参加",
    hero_btn_find: "センターを探す",
    stories_title: "感動的なストーリー",
    story1_title: "分かち合いの血液―蘇る希望",
    story1_desc: "ハノイの若い母親がコミュニティの献血で救われました。彼女の物語は分かち合いの精神を広め、多くの人に人道的献血の価値を認識させました。",
    images_title: "活動写真",
    images_desc: "コミュニティの慈善活動の美しい瞬間",
    image1_title: "愛の陽だまり",
    image1_desc: "コミュニティが一丸となって困っている人々を支援する温かい瞬間。",
    services_title: "慈善サービス",
    services_desc: "さまざまなコミュニティ支援を提供しています",
    service_blood_title: "人道的献血",
    service_blood_desc: "献血に参加して命を救い、患者に希望をもたらしましょう。",
    service_blood_free: "無料",
    service_blood_safe: "安全",
    service_blood_meaning: "意義深い",
    service_blood_btn: "献血登録",
    centers_title: "支援センター",
    centers_desc: "全国の慈善・コミュニティ支援センター一覧",
    centers_filter_all: "すべて",
    centers_filter_blood: "献血",
    centers_filter_clothes: "衣類",
    centers_filter_food: "食料",
    centers_filter_medical: "医療",
    centers_filter_education: "教育",
    centers_search_placeholder: "名前や住所でセンターを検索...",
    centers_city_placeholder: "都道府県を選択",
    contributions_title: "詳細な寄付統計",
    contributions_desc: "詳細な統計を表示し、寄付者名で検索し、各寄付内容を確認できます。",
    contributions_search_placeholder: "寄付者名で検索...",
    situation_title: "支援が必要な状況を共有",
    situation_desc: "あなたが知っている困難な状況や物語を共有し、コミュニティで助け合いましょう！",
    situation_name_placeholder: "あなたの名前または支援が必要な方 *",
    situation_message_placeholder: "状況や物語を共有... *",
    situation_btn: "共有する",
    how_title: "仕組み",
    how_desc: "慈善活動に参加するための簡単な流れ",
    how_step1_title: "参加登録",
    how_step1_desc: "支援の種類を選び、個人情報を登録",
    about_title: "愛のコミュニティについて",
    about_desc: "私たちはコミュニティをつなぐプラットフォームであり、助けたい人と支援が必要な人をつなぐ架け橋です。愛と希望を広める使命のもと、より良い社会づくりに貢献しています。",
    about_feature1: "透明で信頼できる",
    about_feature2: "大規模なコミュニティ",
    about_feature3: "コミュニティ重視の活動",
    contact_title: "お問い合わせ",
    contact_desc: "支援や慈善活動への参加をご希望の方はご連絡ください",
    contact_address_label: "住所",
    contact_address: "123 愛の道、1区、ホーチミン市",
    contact_phone_label: "電話番号",
    contact_phone: "+84 123 456 789",
    contact_email_label: "メール",
    contact_email: "info@congdongyeuthuong.vn",
    contact_time_label: "営業時間",
    contact_time: "月曜～日曜：8:00 - 18:00",
    contact_name_placeholder: "氏名",
    contact_email_placeholder: "メール",
    contact_phone_placeholder: "電話番号",
    contact_subject_placeholder: "件名を選択",
    contact_subject_volunteer: "ボランティア",
    contact_subject_donation: "寄付",
    contact_subject_support: "支援が必要",
    contact_subject_partnership: "提携",
    contact_subject_other: "その他",
    contact_message_placeholder: "メッセージ",
    contact_btn: "メッセージ送信",
    footer_title: "愛のコミュニティ",
    footer_desc: "愛をつなぎ、希望を分かち合う。共により良いコミュニティを築きましょう。",
    footer_services_title: "サービス",
    footer_service_blood: "献血",
    footer_service_clothes: "衣類寄付",
    footer_service_food: "食料支援",
    footer_service_education: "教育支援",
    footer_service_medical: "医療支援",
    footer_info_title: "情報",
    footer_info_about: "私たちについて",
    footer_info_centers: "センター",
    footer_info_contact: "連絡先",
    footer_info_news: "ニュース",
    footer_info_faq: "よくある質問",
    footer_contact_title: "連絡先",
    footer_contact_address: "123 愛の道、1区、ホーチミン市",
    footer_contact_phone: "+84 123 456 789",
    footer_contact_email: "info@congdongyeuthuong.vn",
    footer_copyright: "© 2024 愛のコミュニティ。全著作権所有。",
    // Slider section
    slider_medical_title: "医療支援",
    slider_medical_desc: "貧困層の医療費と薬代を支援します。",
    slider_education_title: "教育支援",
    slider_education_desc: "困難な状況の子供たちに奨学金、本、学習用具を提供します。",
    slider_food_title: "食料支援",
    slider_food_desc: "貧困層に無料の食事と基本的な食料を提供します。",
    slider_clothes_title: "衣類寄付",
    slider_clothes_desc: "古着を集めて困難な状況の人々に配布します。",
    slider_blood_title: "人道献血",
    slider_blood_desc: "献血に参加して命を救い、必要な患者に希望をもたらします。",
    slider_emergency_title: "緊急支援",
    slider_emergency_desc: "緊急事態や自然災害で迅速な支援を提供します。",
    slider_btn: "詳細を見る",
    slider_prev: "<",
    slider_next: ">",
    // Hero stats
    hero_stat_participants: "参加者",
    hero_stat_blood: "献血回数",
    hero_stat_gifts: "贈り物数",
    // Stories
    story_coat_title: "高地の子供たちへの温かいコート",
    story_coat_desc: "寒い冬、都市から寄付された古着が高地の子供たちに届きました。彼らの顔の輝く笑顔が皆の慈善活動を続ける原動力となっています。",
    story_trip_title: "愛の食事",
    story_trip_desc: "支援センターでは、毎日数百食の無料食事がホームレスの人々に配られています。シンプルだが温かい食事が彼らの困難を和らげる助けとなっています。",
    story_education_title: "子供たちへの奨学金",
    story_education_desc: "ベトナム中部で困難を乗り越える貧しい学生が慈善プログラムから奨学金と本を受け取りました。これにより、彼は学校に行く夢を育み、学業で優秀な成績を収めています。",
    story_medical_title: "愛のキャラバン",
    story_medical_desc: "薬と医療用品を満載したトラックが洪水被災者に間に合いました。迅速な支援が多くの人々が病気と自然災害を乗り越える助けとなりました。",
    story_emergency_title: "緊急時の支援の手",
    story_emergency_desc: "家族が火事に遭った時、コミュニティが協力して寄付し、一時的な避難所と必需品を提供しました。団結が彼らが生活を素早く安定させる助けとなりました。",
    story_clothes_title: "学校に行く夢",
    story_clothes_desc: "若者グループが遠隔地の子供たちに本と学習用具を寄付し、彼らが勉強を続け発展する機会を得られるようにしました。",
    story_volunteer_title: "植林活動",
    story_volunteer_desc: "数百人のボランティアが空き地に緑の木を植え、環境保護と気候変動対策に貢献しています。",
    story_food_title: "村を照らす",
    story_food_desc: "ソーラーランプが電気のない村に寄付され、皆に光と喜びをもたらしました。",
    story_water_title: "遠隔村への清潔な水",
    story_water_desc: "コミュニティの貢献により清潔な井戸が建設され、高地の人々が日常使用の清潔な水を得られるようになりました。",
    story_birthday_title: "特別な誕生日パーティー",
    story_birthday_desc: "孤児の子供たちが初めて合同誕生日パーティーを開催し、コミュニティからプレゼントと祝福を受け、関心と愛を感じました。",
    story_animal_title: "手を携えて動物を保護",
    story_animal_desc: "捨てられた動物を救済するキャンペーンが多くの犬や猫が新しい家を見つけ、献身的なケアを受けられるようになりました。",
    // Images
    image2_title: "青春の旅",
    image2_desc: "皆が崇高な目標のために手を携える時の団結の力。",
    image3_title: "青春の旅",
    image3_desc: "小さな行動一つ一つが助けを必要とする人々に喜びと希望をもたらします。",
    // Services
    service_clothes_title: "衣類寄付",
    service_clothes_desc: "古着を集めて困難な状況の人々に配布します。",
    service_clothes_reuse: "再利用",
    service_clothes_env: "環境",
    service_clothes_share: "共有",
    service_clothes_btn: "今すぐ寄付",
    service_food_title: "食料支援",
    service_food_desc: "貧困層に無料の食事と基本的な食料を提供します。",
    service_food_nutrition: "栄養",
    service_food_daily: "日常",
    service_food_free: "無料",
    service_food_btn: "今すぐ支援",
    service_education_title: "教育支援",
    service_education_desc: "困難な状況の子供たちに奨学金と学習支援を提供します。",
    service_education_scholarship: "奨学金",
    service_education_books: "本",
    service_education_future: "未来",
    service_education_btn: "教育支援",
    service_medical_title: "医療支援",
    service_medical_desc: "貧困層の医療費と薬代を支援します。",
    service_medical_exam: "健康診断",
    service_medical_health: "健康",
    service_medical_care: "医療",
    service_medical_btn: "医療支援",
    service_emergency_title: "緊急支援",
    service_emergency_desc: "緊急事態や自然災害で迅速な支援を提供します。",
    service_emergency_fast: "迅速",
    service_emergency_urgent: "緊急",
    service_emergency_effective: "効果的",
    service_emergency_btn: "緊急支援",
    // How it works
    how_step2_title: "情報確認",
    how_step2_desc: "確認のため連絡し、詳細なガイダンスを提供します",
    how_step3_title: "活動参加",
    how_step3_desc: "センターまたは指定された場所に行って実行します",
    how_step3_btn: "今すぐ寄付",
    how_step4_title: "結果追跡",
    how_step4_desc: "活動の影響と結果に関する情報を受け取ります",
    // Centers
    centers_load_more: "さらにセンターを読み込む",
    // Contributions
    contribution_example: "例：グエン・バン・A",
    contribution_cash: "現金",
    contribution_cash_desc: "寄付：高地の子供たちのために現金 - 500,000 VND",
    contribution_time: "01/06/2024 10:00:00",
    // Modals
    modal_title: "サービス登録",
    modal_close: "×",
    success_title: "登録成功！",
    success_desc: "ご参加ありがとうございます。すぐにご連絡いたします。",
    success_btn: "閉じる",
    // Login/Register
    login_title: "ログイン",
    login_email_label: "メールまたは電話",
    login_email_placeholder: "メールまたは電話",
    login_password_label: "パスワード",
    login_password_placeholder: "パスワード",
    login_btn: "ログイン",
    login_forgot: "パスワードを忘れた？",
    login_to_register: "アカウントがない？登録",
    register_title: "アカウント登録",
    register_name_label: "氏名",
    register_name_placeholder: "氏名",
    register_email_label: "メールまたは電話",
    register_email_placeholder: "メールまたは電話",
    register_password_label: "パスワード",
    register_password_placeholder: "パスワード",
    register_confirm_label: "パスワード確認",
    register_confirm_placeholder: "パスワード確認",
    register_btn: "登録",
    register_to_login: "すでにアカウントがある？ログイン",
    chatbot_title: "相談・質問受付",
  },
  ko: {
    menu_home: "홈",
    menu_services: "서비스",
    menu_centers: "센터",
    menu_about: "회사 소개",
    menu_contact: "문의하기",
    hero_title: "사랑을 연결하다",
    hero_subtitle: "희망을 나누다",
    hero_desc: "헌혈, 의류 기부, 의미 있는 자선 활동을 통해 어려운 이웃을 돕는 커뮤니티 플랫폼입니다.",
    hero_btn_join: "지금 참여하기",
    hero_btn_find: "센터 찾기",
    stories_title: "감동적인 이야기",
    story1_title: "나눔의 피 – 다시 살아난 희망",
    story1_desc: "하노이의 한 젊은 어머니가 지역사회의 헌혈로 생명을 구했습니다. 그녀의 이야기는 나눔의 정신을 전파하여 많은 이들이 인도적 헌혈의 가치를 깨닫게 했습니다.",
    images_title: "활동 사진",
    images_desc: "커뮤니티 자선 활동의 아름다운 순간들",
    image1_title: "사랑의 햇살",
    image1_desc: "커뮤니티가 함께 모여 어려운 이웃을 따뜻하게 돕는 순간들.",
    services_title: "자선 서비스",
    services_desc: "다양한 커뮤니티 지원을 제공합니다",
    service_blood_title: "인도적 헌혈",
    service_blood_desc: "헌혈에 참여하여 생명을 구하고 환자에게 희망을 전하세요.",
    service_blood_free: "무료",
    service_blood_safe: "안전",
    service_blood_meaning: "의미 있음",
    service_blood_btn: "헌혈 등록",
    centers_title: "지원 센터",
    centers_desc: "전국 자선 및 커뮤니티 지원 센터 목록",
    centers_filter_all: "전체",
    centers_filter_blood: "헌혈",
    centers_filter_clothes: "의류",
    centers_filter_food: "식품",
    centers_filter_medical: "의료",
    centers_filter_education: "교육",
    centers_search_placeholder: "이름 또는 주소로 센터 검색...",
    centers_city_placeholder: "도/시 선택",
    contributions_title: "기부 상세 통계",
    contributions_desc: "상세 통계를 보고, 기부자 이름으로 검색하고, 각 기부 내역을 확인하세요.",
    contributions_search_placeholder: "기부자 이름으로 검색...",
    situation_title: "도움이 필요한 상황 공유",
    situation_desc: "여러분이 아는 어려운 상황이나 이야기를 공유해 커뮤니티가 함께 도울 수 있도록 해주세요!",
    situation_name_placeholder: "본인 또는 도움이 필요한 분 *",
    situation_message_placeholder: "상황, 이야기 공유... *",
    situation_btn: "공유하기",
    how_title: "작동 방식",
    how_desc: "자선 활동에 참여하는 간단한 절차",
    how_step1_title: "참여 등록",
    how_step1_desc: "지원 유형을 선택하고 개인정보를 등록",
    about_title: "사랑의 커뮤니티 소개",
    about_desc: "우리는 커뮤니티를 연결하는 플랫폼으로, 돕고자 하는 사람과 도움이 필요한 사람을 이어주는 다리입니다. 사랑과 희망을 전파하는 사명을 가지고 더 나은 사회를 만들기 위해 기여하고 있습니다.",
    about_feature1: "투명하고 신뢰할 수 있음",
    about_feature2: "대규모 커뮤니티",
    about_feature3: "커뮤니티 중심 활동",
    contact_title: "문의하기",
    contact_desc: "지원이 필요하거나 자선 활동에 참여하고 싶으시면 문의해 주세요",
    contact_address_label: "주소",
    contact_address: "123 사랑길, 1구, 호치민시",
    contact_phone_label: "전화번호",
    contact_phone: "+84 123 456 789",
    contact_email_label: "이메일",
    contact_email: "info@congdongyeuthuong.vn",
    contact_time_label: "영업시간",
    contact_time: "월~일: 8:00 - 18:00",
    contact_name_placeholder: "이름",
    contact_email_placeholder: "이메일",
    contact_phone_placeholder: "전화번호",
    contact_subject_placeholder: "주제 선택",
    contact_subject_volunteer: "자원봉사자",
    contact_subject_donation: "기부",
    contact_subject_support: "지원 필요",
    contact_subject_partnership: "협력",
    contact_subject_other: "기타",
    contact_message_placeholder: "메시지",
    contact_btn: "메시지 보내기",
    footer_title: "사랑의 커뮤니티",
    footer_desc: "사랑을 연결하고 희망을 나눕니다. 함께 더 나은 커뮤니티를 만들어가요.",
    footer_services_title: "서비스",
    footer_service_blood: "헌혈",
    footer_service_clothes: "의류 기부",
    footer_service_food: "식품 지원",
    footer_service_education: "교육 지원",
    footer_service_medical: "의료 지원",
    footer_info_title: "정보",
    footer_info_about: "회사 소개",
    footer_info_centers: "센터",
    footer_info_contact: "문의하기",
    footer_info_news: "뉴스",
    footer_info_faq: "자주 묻는 질문",
    footer_contact_title: "문의하기",
    footer_contact_address: "123 사랑길, 1구, 호치민시",
    footer_contact_phone: "+84 123 456 789",
    footer_contact_email: "info@congdongyeuthuong.vn",
    footer_copyright: "© 2024 사랑의 커뮤니티. 모든 권리 보유.",
    // Slider section
    slider_medical_title: "의료 지원",
    slider_medical_desc: "빈곤층의 의료비와 약값을 지원합니다.",
    slider_education_title: "교육 지원",
    slider_education_desc: "어려운 상황의 아이들에게 장학금, 책, 학습용품을 제공합니다.",
    slider_food_title: "식량 지원",
    slider_food_desc: "빈곤층에게 무료 식사와 기본 식량을 제공합니다.",
    slider_clothes_title: "의류 기부",
    slider_clothes_desc: "중고 의류를 모아 어려운 상황의 사람들에게 배포합니다.",
    slider_blood_title: "인도주의 헌혈",
    slider_blood_desc: "헌혈에 참여하여 생명을 구하고, 필요한 환자에게 희망을 가져다줍니다.",
    slider_emergency_title: "긴급 지원",
    slider_emergency_desc: "긴급 상황과 자연재해에서 신속한 지원을 제공합니다.",
    slider_btn: "자세히 보기",
    slider_prev: "<",
    slider_next: ">",
    // Hero stats
    hero_stat_participants: "참가자",
    hero_stat_blood: "헌혈 횟수",
    hero_stat_gifts: "선물 수",
    // Stories
    story_coat_title: "고지 아이들에게 따뜻한 코트",
    story_coat_desc: "추운 겨울, 도시에서 기부된 중고 의류가 고지의 아이들에게 도달했습니다. 그들의 밝은 미소가 모두의 자선 활동을 계속하는 동력이 되고 있습니다.",
    story_trip_title: "사랑의 식사",
    story_trip_desc: "지원 센터에서는 매일 수백 끼의 무료 식사가 노숙자들에게 배부되고 있습니다. 간단하지만 따뜻한 식사가 그들의 어려움을 덜어주는 도움이 되고 있습니다.",
    story_education_title: "아이들에게 장학금",
    story_education_desc: "베트남 중부에서 어려움을 극복하는 가난한 학생이 자선 프로그램에서 장학금과 책을 받았습니다. 이를 통해 그는 학교에 가는 꿈을 키우고 학업에서 뛰어난 성적을 거두고 있습니다.",
    story_medical_title: "사랑의 캐러밴",
    story_medical_desc: "약품과 의료용품을 가득 실은 트럭이 홍수 피해자들에게 제때 도착했습니다. 신속한 지원이 많은 사람들이 질병과 자연재해를 극복하는 도움이 되었습니다.",
    story_emergency_title: "긴급 상황에서의 도움의 손길",
    story_emergency_desc: "가족이 화재를 당했을 때, 커뮤니티가 협력하여 기부하고, 임시 대피소와 필수품을 제공했습니다. 단결이 그들이 생활을 빠르게 안정화하는 도움이 되었습니다.",
    story_clothes_title: "학교에 가는 꿈",
    story_clothes_desc: "젊은이 그룹이 원격지 아이들에게 책과 학습용품을 기부하여, 그들이 공부를 계속하고 발전할 기회를 얻을 수 있도록 했습니다.",
    story_volunteer_title: "조림 활동",
    story_volunteer_desc: "수백 명의 자원봉사자가 빈 땅에 녹색 나무를 심어 환경보호와 기후변화 대응에 기여하고 있습니다.",
    story_food_title: "마을을 밝히는",
    story_food_desc: "태양광 램프가 전기가 없는 마을에 기부되어 모든 사람에게 빛과 기쁨을 가져다주었습니다.",
    story_water_title: "원격 마을에 깨끗한 물",
    story_water_desc: "커뮤니티의 기여로 깨끗한 우물이 건설되어 고지 사람들이 일상 사용의 깨끗한 물을 얻을 수 있게 되었습니다.",
    story_birthday_title: "특별한 생일 파티",
    story_birthday_desc: "고아 아이들이 처음으로 공동 생일 파티를 열어 커뮤니티로부터 선물과 축복을 받고 관심과 사랑을 느꼈습니다.",
    story_animal_title: "손을 잡고 동물 보호",
    story_animal_desc: "버려진 동물을 구호하는 캠페인이 많은 강아지와 고양이가 새로운 집을 찾고 헌신적인 돌봄을 받을 수 있도록 도왔습니다.",
    // Images
    image2_title: "청춘의 여행",
    image2_desc: "모두가 숭고한 목표를 위해 손을 잡을 때의 단결의 힘.",
    image3_title: "청춘의 여행",
    image3_desc: "작은 행동 하나하나가 도움이 필요한 사람들에게 기쁨과 희망을 가져다줍니다.",
    // Services
    service_clothes_title: "의류 기부",
    service_clothes_desc: "중고 의류를 모아 어려운 상황의 사람들에게 배포합니다.",
    service_clothes_reuse: "재사용",
    service_clothes_env: "환경",
    service_clothes_share: "공유",
    service_clothes_btn: "지금 기부",
    service_food_title: "식량 지원",
    service_food_desc: "빈곤층에게 무료 식사와 기본 식량을 제공합니다.",
    service_food_nutrition: "영양",
    service_food_daily: "일상",
    service_food_free: "무료",
    service_food_btn: "지금 지원",
    service_education_title: "교육 지원",
    service_education_desc: "어려운 상황의 아이들에게 장학금과 학습 지원을 제공합니다.",
    service_education_scholarship: "장학금",
    service_education_books: "책",
    service_education_future: "미래",
    service_education_btn: "교육 지원",
    service_medical_title: "의료 지원",
    service_medical_desc: "빈곤층의 의료비와 약값을 지원합니다.",
    service_medical_exam: "건강검진",
    service_medical_health: "건강",
    service_medical_care: "의료",
    service_medical_btn: "의료 지원",
    service_emergency_title: "긴급 지원",
    service_emergency_desc: "긴급 상황과 자연재해에서 신속한 지원을 제공합니다.",
    service_emergency_fast: "신속",
    service_emergency_urgent: "긴급",
    service_emergency_effective: "효과적",
    service_emergency_btn: "긴급 지원",
    // How it works
    how_step2_title: "정보 확인",
    how_step2_desc: "확인을 위해 연락하고 상세한 가이던스를 제공합니다",
    how_step3_title: "활동 참가",
    how_step3_desc: "센터 또는 지정된 장소에 가서 실행합니다",
    how_step3_btn: "지금 기부",
    how_step4_title: "결과 추적",
    how_step4_desc: "활동의 영향과 결과에 대한 정보를 받습니다",
    // Centers
    centers_load_more: "더 많은 센터 로드",
    // Contributions
    contribution_example: "예: 응우옌 반 A",
    contribution_cash: "현금",
    contribution_cash_desc: "기부: 고지 아이들을 위해 현금 - 500,000 VND",
    contribution_time: "01/06/2024 10:00:00",
    // Modals
    modal_title: "서비스 등록",
    modal_close: "×",
    success_title: "등록 성공!",
    success_desc: "참여해 주셔서 감사합니다. 곧 연락드리겠습니다.",
    success_btn: "閉じる",
    // Login/Register
    login_title: "ログイン",
    login_email_label: "メールまたは電話",
    login_email_placeholder: "メールまたは電話",
    login_password_label: "パスワード",
    login_password_placeholder: "パスワード",
    login_btn: "ログイン",
    login_forgot: "パスワードを忘れた？",
    login_to_register: "アカウントがない？登録",
    register_title: "アカウント登録",
    register_name_label: "氏名",
    register_name_placeholder: "氏名",
    register_email_label: "メールまたは電話",
    register_email_placeholder: "メールまたは電話",
    register_password_label: "パスワード",
    register_password_placeholder: "パスワード",
    register_confirm_label: "パスワード確認",
    register_confirm_placeholder: "パスワード確認",
    register_btn: "登録",
    register_to_login: "すでにアカウントがある？ログイン",
    chatbot_title: "相談・質問受付",
  }
};

function applyTranslation(lang) {
  // Dịch text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Dịch placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  // Dịch option trong select
  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Lưu ngôn ngữ đã chọn
  localStorage.setItem('selectedLang', lang);
}

document.addEventListener('DOMContentLoaded', function() {
  // Dropdown ngôn ngữ
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const currentLang = document.getElementById('currentLang');
  const langSwitcher = document.querySelector('.language-switcher');

  if (langBtn && langDropdown && currentLang && langSwitcher) {
    langBtn.onclick = function(e) {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
    };
    langDropdown.querySelectorAll('li').forEach(function(item) {
      item.onclick = function() {
        const lang = item.getAttribute('data-lang');
        currentLang.textContent = item.textContent;
        langSwitcher.classList.remove('open');
        applyTranslation(lang);
      };
    });
    document.body.addEventListener('click', function() {
      langSwitcher.classList.remove('open');
    });
  }
});

// ===== ĐĂNG NHẬP/ĐĂNG KÝ ĐƠN GIẢN, CHẮC CHẮN HOẠT ĐỘNG =====
document.addEventListener('DOMContentLoaded', function() {
  // Lấy các phần tử modal và nút
  var btnLogin = document.getElementById('btnLogin');
  var loginModal = document.getElementById('loginModal');
  var registerModal = document.getElementById('registerModal');
  var closeLogin = document.getElementById('closeLogin');
  var closeRegister = document.getElementById('closeRegister');
  var toRegister = document.getElementById('toRegister');
  var toLogin = document.getElementById('toLogin');
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');

  // Hiển thị user info nếu đã đăng nhập
  function showUserBox() {
    var navActions = document.querySelector('.nav-actions');
    var btnLogin = document.getElementById('btnLogin');
    var name = localStorage.getItem('loggedInUser');
    if (localStorage.getItem('loggedIn') === 'true' && name) {
      if (btnLogin) btnLogin.style.display = 'none';
      var userBox = document.getElementById('userBox');
      if (!userBox) {
        userBox = document.createElement('div');
        userBox.id = 'userBox';
        userBox.style.display = 'inline-block';
        userBox.style.marginLeft = '12px';
        userBox.innerHTML = `<span style="color:#ea5647;font-weight:600;display:inline-flex;align-items:center;"><i class="fas fa-user-circle" style="font-size:1.3em;margin-right:6px;"></i> ${name}</span> <button id="logoutBtn" style="margin-left:8px;padding:4px 10px;border-radius:5px;border:none;background:#ea5647;color:#fff;cursor:pointer;">Đăng xuất</button>`;
        navActions.appendChild(userBox);
      } else {
        userBox.querySelector('span').innerHTML = `<i class=\"fas fa-user-circle\" style=\"font-size:1.3em;margin-right:6px;\"></i> ${name}`;
      }
      // Đăng xuất
      document.getElementById('logoutBtn').onclick = function() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInUser');
        userBox.remove();
        if (btnLogin) btnLogin.style.display = '';
      };
    }
  }

  // Mở modal đăng nhập
  if (btnLogin && loginModal) {
    btnLogin.onclick = function() {
      loginModal.style.display = 'flex';
    };
  }
  // Đóng modal đăng nhập
  if (closeLogin && loginModal) {
    closeLogin.onclick = function() {
      loginModal.style.display = 'none';
    };
  }
  // Đóng modal đăng ký
  if (closeRegister && registerModal) {
    closeRegister.onclick = function() {
      registerModal.style.display = 'none';
    };
  }
  // Chuyển sang modal đăng ký
  if (toRegister && loginModal && registerModal) {
    toRegister.onclick = function(e) {
      e.preventDefault();
      loginModal.style.display = 'none';
      registerModal.style.display = 'flex';
    };
  }
  // Chuyển sang modal đăng nhập
  if (toLogin && loginModal && registerModal) {
    toLogin.onclick = function(e) {
      e.preventDefault();
      registerModal.style.display = 'none';
      loginModal.style.display = 'flex';
    };
  }
  // Đóng modal khi click ra ngoài
  window.onclick = function(event) {
    if (event.target === loginModal) loginModal.style.display = 'none';
    if (event.target === registerModal) registerModal.style.display = 'none';
  };

  // Xử lý đăng ký: lưu user
  if (registerForm) {
    registerForm.onsubmit = function(e) {
      e.preventDefault();
      var name = document.getElementById('registerName').value.trim();
      var email = document.getElementById('registerEmail').value.trim();
      var pass = document.getElementById('registerPassword').value;
      var pass2 = document.getElementById('registerPasswordConfirm').value;
      if (pass !== pass2) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
      }
      localStorage.setItem('user', JSON.stringify({ name, email, pass }));
      alert('Đăng ký thành công! Bạn có thể đăng nhập.');
      registerModal.style.display = 'none';
      registerForm.reset();
    };
  }
  // Xử lý đăng nhập: kiểm tra user, lưu trạng thái
  if (loginForm) {
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      var email = document.getElementById('loginEmail').value.trim();
      var pass = document.getElementById('loginPassword').value;
      var user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email === email && user.pass === pass) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('loggedInUser', user.name);
        alert('Đăng nhập thành công!');
        loginModal.style.display = 'none';
        loginForm.reset();
        showUserBox();
      } else {
        alert('Sai thông tin đăng nhập!');
      }
    };
  }
  // Tự động hiển thị user nếu đã đăng nhập
  showUserBox();
});

function removeGoogleTranslateBanner() {
  // Xóa mọi iframe Google Translate banner khỏi DOM
  var iframes = document.querySelectorAll('iframe');
  iframes.forEach(function(iframe) {
    if (
      iframe.className.indexOf('goog-te-banner-frame') !== -1 ||
      (iframe.src && (
        iframe.src.indexOf('translate.googleapis.com') !== -1 ||
        iframe.src.indexOf('translate.google.com') !== -1
      ))
    ) {
      iframe.parentNode && iframe.parentNode.removeChild(iframe);
    }
  });

  // XÓA banner, tooltip, box nhưng KHÔNG xóa widget chính
  var banners = document.querySelectorAll(
    '#goog-gt-tt, .goog-te-balloon-frame, .goog-te-menu-frame, .goog-tooltip, .goog-text-highlight'
    // KHÔNG xóa .skiptranslate hoặc #google_translate_element
  );
  banners.forEach(function(el) {
    el.parentNode && el.parentNode.removeChild(el);
  });

  // Xóa margin, top nếu có
  document.body.style.top = '0px';
  document.documentElement.style.marginTop = '0px';
}
setInterval(removeGoogleTranslateBanner, 300);

// ===== GEMINI AI CHATBOT =====
const GEMINI_API_KEY = 'AIzaSyDsQR5LgjPvy70e-tVwzIVx6SGcA3o3oWY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

let chatHistory = [];

function appendMessage(text, sender = 'user') {
  const chatbotMessages = document.getElementById('chatbot-messages');
  if (!chatbotMessages) return;
  const msg = document.createElement('div');
  msg.className = 'chatbot-message ' + sender;
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTypingIndicator() {
  const chatbotMessages = document.getElementById('chatbot-messages');
  if (!chatbotMessages) return;
  const currentLang = localStorage.getItem('currentLanguage') || 'vi';
  let typingText = 'AI đang nhập...';
  switch(currentLang) {
    case 'en': typingText = 'AI is typing...'; break;
    case 'zh': typingText = 'AI正在输入...'; break;
    case 'ja': typingText = 'AIが入力中...'; break;
    case 'ko': typingText = 'AI가 입력 중...'; break;
  }
  const typing = document.createElement('div');
  typing.className = 'chatbot-message bot typing-indicator';
  typing.innerHTML = `<span class="typing-dots">${typingText}</span>`;
  chatbotMessages.appendChild(typing);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  return typing;
}

function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator && typingIndicator.parentNode) {
    typingIndicator.parentNode.removeChild(typingIndicator);
  }
}

async function sendToGemini(userMessage) {
  try {
    // Tạo request body theo format mới của Gemini 2.0
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: userMessage
            }
          ]
        }
      ]
    };
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      console.error('API Response:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    removeTypingIndicator();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      appendMessage(aiResponse, 'bot');
    } else {
      console.error('Invalid API response:', data);
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    removeTypingIndicator();
    const currentLang = localStorage.getItem('currentLanguage') || 'vi';
    let errorMessage = 'Xin lỗi, tôi gặp lỗi kết nối. Vui lòng thử lại sau.';
    switch(currentLang) {
      case 'en': errorMessage = 'Sorry, I encountered a connection error. Please try again later.'; break;
      case 'zh': errorMessage = '抱歉，我遇到了连接错误。请稍后再试。'; break;
      case 'ja': errorMessage = '申し訳ございませんが、接続エラーが発生しました。後でもう一度お試しください。'; break;
      case 'ko': errorMessage = '죄송합니다. 연결 오류가 발생했습니다. 나중에 다시 시도해 주세요.'; break;
    }
    appendMessage(errorMessage, 'bot');
  }
}

function sendMessage() {
  const chatbotInput = document.getElementById('chatbot-input');
  if (!chatbotInput) return;
  const text = chatbotInput.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  chatbotInput.value = '';
  showTypingIndicator();
  sendToGemini(text);
}

function initializeChatbot() {
  const currentLang = localStorage.getItem('currentLanguage') || 'vi';
  let welcomeMessage = '';
  switch(currentLang) {
    case 'en': welcomeMessage = `Hello! I'm a consultant. You can ask me any question and I'll do my best to help you.`; break;
    case 'zh': welcomeMessage = `你好！我是咨询顾问。你可以问我任何问题，我会尽力帮助你。`; break;
    case 'ja': welcomeMessage = `こんにちは！私はコンサルタントです。どんな質問でもどうぞ、お答えします。`; break;
    case 'ko': welcomeMessage = `안녕하세요! 저는 상담사입니다. 궁금한 점이 있으면 무엇이든 물어보세요.`; break;
    default: welcomeMessage = `Xin chào! Tôi là nhân viên tư vấn. Bạn có thể hỏi tôi bất kỳ thắc mắc nào, tôi sẽ cố gắng giải đáp cho bạn.`;
  }
  appendMessage(welcomeMessage, 'bot');
}

// Khởi tạo chatbot khi DOM load xong
document.addEventListener('DOMContentLoaded', function() {
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');

  if (chatbotToggleBtn && chatbotContainer) {
    chatbotToggleBtn.onclick = () => {
      chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
      if (chatbotContainer.style.display === 'flex' && chatbotInput) {
        chatbotInput.focus();
      }
    };
  }

  if (chatbotSendBtn && chatbotInput) {
    chatbotSendBtn.onclick = sendMessage;
    chatbotInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Khởi tạo tin nhắn chào mừng khi mở chat lần đầu
  if (chatbotMessages && chatbotMessages.childElementCount === 0) {
    initializeChatbot();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var forgotPasswordLink = document.getElementById('forgotPasswordLink');
  var forgotPasswordModal = document.getElementById('forgotPasswordModal');
  var closeForgotPassword = document.getElementById('closeForgotPassword');
  var forgotPasswordForm = document.getElementById('forgotPasswordForm');
  var forgotPasswordMsg = document.getElementById('forgotPasswordMsg');

  if (forgotPasswordLink && forgotPasswordModal) {
    forgotPasswordLink.onclick = function(e) {
      e.preventDefault();
      forgotPasswordModal.style.display = 'flex';
      forgotPasswordMsg.textContent = '';
    };
  }
  if (closeForgotPassword && forgotPasswordModal) {
    closeForgotPassword.onclick = function() {
      forgotPasswordModal.style.display = 'none';
    };
  }
  window.onclick = function(event) {
    if (event.target === forgotPasswordModal) forgotPasswordModal.style.display = 'none';
  };
  if (forgotPasswordForm) {
    forgotPasswordForm.onsubmit = function(e) {
      e.preventDefault();
      var email = document.getElementById('forgotEmail').value.trim();
      var user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.email === email) {
        forgotPasswordMsg.style.color = 'green';
        forgotPasswordMsg.textContent = 'Mật khẩu của bạn là: ' + user.pass;
      } else {
        forgotPasswordMsg.style.color = 'red';
        forgotPasswordMsg.textContent = 'Email không đúng hoặc chưa đăng ký!';
      }
    };
  }
});


