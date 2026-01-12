# Sử dụng hình ảnh cha là một Node runtime chính thức
FROM node:14-alpine
# Đặt thư mục làm việc là /app
WORKDIR /app
# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./
# Cài đặt các gói cần thiết được chỉ định trong package.json
RUN npm install
# Sao chép phần còn lại của mã ứng dụng vào thư mục làm việc
COPY . .
# Thiết lập biến môi trường
ENV REACT_APP_API_URL=express-app
ENV REACT_APP_API_PORT=3001
# Mở cổng 3000 để có sẵn cho thế giới bên ngoài container này

EXPOSE 3000
# Chạy ứng dụng khi container khởi chạy
CMD ["npm", "start"]
