# SignTrack Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy Project URL and Anon Key
4. Run database setup script in SQL Editor
5. Enable RLS policies

### 2. Vercel Deployment
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Add environment variables
4. Deploy!

### 3. Domain Setup (Optional)
1. Add custom domain in Vercel
2. Update NEXT_PUBLIC_SITE_URL
3. Configure DNS

## 📋 Pre-Deployment Checklist

### Required:
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Environment variables set
- [ ] Authentication working
- [ ] RLS policies enabled

### Optional:
- [ ] Custom domain configured
- [ ] Email service setup
- [ ] Error monitoring (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring

## 🔧 Environment Variables

### Production (.env.production):
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
\`\`\`

### Development (.env.local):
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## 🗄️ Database Setup

1. Go to Supabase SQL Editor
2. Run the database-setup.sql script
3. Run the add-user-id-to-tables.sql script
4. Verify RLS policies are active

## 🔐 Security Checklist

- [ ] RLS policies enabled
- [ ] Environment variables secure
- [ ] No sensitive data in code
- [ ] HTTPS enabled
- [ ] Authentication working

## 📱 Testing Checklist

- [ ] User registration works
- [ ] Email verification works
- [ ] Login/logout works
- [ ] All CRUD operations work
- [ ] Mobile responsive
- [ ] Cross-browser compatible

## 🚀 Go Live Steps

1. **Deploy to Vercel:**
   \`\`\`bash
   npm run build
   vercel --prod
   \`\`\`

2. **Test Production:**
   - Create test account
   - Test all features
   - Check mobile responsiveness

3. **Monitor:**
   - Check error logs
   - Monitor performance
   - User feedback

## 🔧 Post-Deployment

- Set up monitoring
- Configure backups
- Plan updates
- User training
