CREATE TABLE IF NOT EXISTS users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     phone VARCHAR(20),
     role VARCHAR(20) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
     profile_image TEXT,
     is_verified BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Courses table
   CREATE TABLE IF NOT EXISTS courses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title VARCHAR(255) NOT NULL,
     short_description TEXT NOT NULL,
     description TEXT NOT NULL,
     instructor_id UUID REFERENCES users(id) ON DELETE CASCADE,
     category VARCHAR(100) NOT NULL,
     level VARCHAR(20) NOT NULL CHECK (level IN ('10', '11', '12')),
     price DECIMAL(12,2) NOT NULL,
     original_price DECIMAL(12,2),
     duration VARCHAR(50) NOT NULL,
     total_lessons INTEGER NOT NULL,
     image_url TEXT,
     requirements TEXT[],
     what_you_will_learn TEXT[],
     is_published BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Course sections table
   CREATE TABLE IF NOT EXISTS course_sections (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
     title VARCHAR(255) NOT NULL,
     order_index INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Lessons table
   CREATE TABLE IF NOT EXISTS lessons (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     section_id UUID REFERENCES course_sections(id) ON DELETE CASCADE,
     title VARCHAR(255) NOT NULL,
     duration VARCHAR(20) NOT NULL,
     type VARCHAR(20) DEFAULT 'video' CHECK (type IN ('video', 'text', 'quiz')),
     content_url TEXT,
     order_index INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Transactions table
   CREATE TABLE IF NOT EXISTS transactions (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
     transaction_id VARCHAR(100) UNIQUE NOT NULL,
     amount DECIMAL(12,2) NOT NULL,
     status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
     payment_method VARCHAR(50) NOT NULL,
     payment_details JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enrollments table
   CREATE TABLE IF NOT EXISTS enrollments (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
     transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
     enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     progress DECIMAL(5,2) DEFAULT 0.00,
     completed_at TIMESTAMP WITH TIME ZONE,
     UNIQUE(user_id, course_id)
   );

   -- Lesson progress table
   CREATE TABLE IF NOT EXISTS lesson_progress (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
     is_completed BOOLEAN DEFAULT false,
     completed_at TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, lesson_id)
   );