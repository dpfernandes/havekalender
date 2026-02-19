/*
  # Fix Security Issues

  ## Overview
  This migration addresses critical security and performance issues identified in the crops table.

  ## Changes Made

  ### 1. Remove Unused Indexes
  Dropping four GIN indexes that are not being used by the application:
  - `idx_crops_sow_indoor` - Index on sow_indoor array column
  - `idx_crops_sow_outdoor` - Index on sow_outdoor array column  
  - `idx_crops_transplant` - Index on transplant array column
  - `idx_crops_harvest` - Index on harvest array column
  
  **Rationale:** These indexes consume storage and slow down write operations without providing query performance benefits since they're not being used.

  ### 2. Fix Overly Permissive RLS Policies
  Replacing three policies that allowed unrestricted access to authenticated users:
  
  **OLD (Insecure):**
  - Any authenticated user could INSERT, UPDATE, or DELETE any crop record
  - USING (true) and WITH CHECK (true) effectively bypassed RLS
  
  **NEW (Secure):**
  - Only users with an admin role can modify crop data
  - Checks for `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`
  - Maintains backward compatibility: if no admin users exist yet, policies are ready when auth is implemented
  
  ### 3. Policies Summary

  After this migration, the crops table will have:
  
  1. **"Anyone can read crops"** (unchanged)
     - FOR SELECT to anon, authenticated  
     - USING (true)
     - Public read access maintained for calendar functionality
  
  2. **"Only admins can insert crops"** (new)
     - FOR INSERT to authenticated
     - WITH CHECK: requires admin role in JWT app_metadata
  
  3. **"Only admins can update crops"** (new)
     - FOR UPDATE to authenticated
     - USING & WITH CHECK: requires admin role in JWT app_metadata
  
  4. **"Only admins can delete crops"** (new)
     - FOR DELETE to authenticated  
     - USING: requires admin role in JWT app_metadata

  ## Security Improvements

  - ✅ Prevents unauthorized data modification by regular authenticated users
  - ✅ Implements proper role-based access control (RBAC)
  - ✅ Removes unused indexes that provide no security or performance benefit
  - ✅ Maintains public read access for the calendar application
  - ✅ Future-proof: ready for when admin authentication is implemented

  ## Notes

  - The Auth DB Connection Strategy issue requires configuration changes in Supabase dashboard (not addressable via SQL migration)
  - Admin users will need `app_metadata.role = 'admin'` set in their user record to modify crops
  - Read operations remain unrestricted for both anonymous and authenticated users
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_crops_sow_indoor;
DROP INDEX IF EXISTS idx_crops_sow_outdoor;
DROP INDEX IF EXISTS idx_crops_transplant;
DROP INDEX IF EXISTS idx_crops_harvest;

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert crops" ON crops;
DROP POLICY IF EXISTS "Authenticated users can update crops" ON crops;
DROP POLICY IF EXISTS "Authenticated users can delete crops" ON crops;

-- Create secure, role-based policies

-- Policy: Only admins can insert crops
CREATE POLICY "Only admins can insert crops"
  ON crops
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Policy: Only admins can update crops
CREATE POLICY "Only admins can update crops"
  ON crops
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Policy: Only admins can delete crops
CREATE POLICY "Only admins can delete crops"
  ON crops
  FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );