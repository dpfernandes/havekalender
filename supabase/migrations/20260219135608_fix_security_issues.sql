/*
  # Fix Security Issues in Crops Table

  ## Overview
  This migration addresses critical security vulnerabilities identified in the crops table.

  ## Changes Made

  ### 1. Remove Unused Indexes
  Drops four GIN indexes that are not being utilized by the application:
  - `idx_crops_sow_indoor` - Not used in queries
  - `idx_crops_sow_outdoor` - Not used in queries
  - `idx_crops_transplant` - Not used in queries
  - `idx_crops_harvest` - Not used in queries
  
  **Rationale:** These indexes consume storage and slow down write operations without providing any query performance benefit.

  ### 2. Fix RLS Policy Security Vulnerabilities
  
  **Problem:** Previous policies allowed ANY authenticated user to insert, update, or delete crops using `USING (true)` and `WITH CHECK (true)`, which completely bypasses row-level security.
  
  **Solution:** Drop overly permissive policies and implement proper restrictions:
  - **Keep:** Public read access (this is a public reference app)
  - **Remove:** Insert, update, and delete policies for authenticated users
  - **Future:** Admin-specific policies can be added when admin authentication is implemented
  
  ## Security Improvements
  
  1. **Principle of Least Privilege:** Users can only read data, not modify it
  2. **Data Integrity:** Protects against unauthorized modifications
  3. **Performance:** Removes unnecessary indexes
  
  ## Notes
  - This makes the crops table effectively read-only for all users
  - To enable admin functionality in the future, add specific policies checking for admin roles
  - The table remains publicly readable as intended for this reference application
*/

-- Drop unused indexes to improve write performance and reduce storage
DROP INDEX IF EXISTS idx_crops_sow_indoor;
DROP INDEX IF EXISTS idx_crops_sow_outdoor;
DROP INDEX IF EXISTS idx_crops_transplant;
DROP INDEX IF EXISTS idx_crops_harvest;

-- Drop insecure policies that allow unrestricted access
DROP POLICY IF EXISTS "Authenticated users can insert crops" ON crops;
DROP POLICY IF EXISTS "Authenticated users can update crops" ON crops;
DROP POLICY IF EXISTS "Authenticated users can delete crops" ON crops;

-- The "Anyone can read crops" policy remains active
-- This provides public read access while blocking all write operations
-- Future admin policies can be added with proper role-based access control