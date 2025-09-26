#!/usr/bin/env python
"""
Script to update existing tree projects from Naira to USD pricing
"""
import os
import sys
import django

# Add the project directory to Python path
sys.path.append('/mnt/c/Users/Maryan/Documents/Climate Wavers New/climate-wavers-disaster-alert-system/backend-new')

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth.settings')
django.setup()

from core.models import TreeProject
from decimal import Decimal

def update_currency_to_usd():
    """Update all tree projects to use USD pricing"""
    
    # Update Lagos project
    lagos_project = TreeProject.objects.get(name='Lagos Urban Greening Initiative')
    lagos_project.tree_price = Decimal('5.00')  # $5 USD per tree
    lagos_project.total_budget = Decimal('50000.00')  # $50,000 USD total budget
    lagos_project.funds_raised = Decimal('17500.00')  # $17,500 USD raised
    lagos_project.funding_goal = Decimal('50000.00')  # $50,000 USD goal
    lagos_project.save()
    print(f"Updated {lagos_project.name} to USD pricing")
    
    # Update Nairobi project
    nairobi_project = TreeProject.objects.get(name='Nairobi Reforestation Project')
    nairobi_project.tree_price = Decimal('3.00')  # $3 USD per tree
    nairobi_project.total_budget = Decimal('45000.00')  # $45,000 USD total budget
    nairobi_project.funds_raised = Decimal('25500.00')  # $25,500 USD raised
    nairobi_project.funding_goal = Decimal('45000.00')  # $45,000 USD goal
    nairobi_project.save()
    print(f"Updated {nairobi_project.name} to USD pricing")
    
    # Update Cape Town project
    cape_town_project = TreeProject.objects.get(name='Cape Town Community Garden')
    cape_town_project.tree_price = Decimal('2.00')  # $2 USD per tree
    cape_town_project.total_budget = Decimal('10000.00')  # $10,000 USD total budget
    cape_town_project.funds_raised = Decimal('4000.00')  # $4,000 USD raised
    cape_town_project.funding_goal = Decimal('10000.00')  # $10,000 USD goal
    cape_town_project.save()
    print(f"Updated {cape_town_project.name} to USD pricing")
    
    print("Successfully updated all projects to USD pricing!")

if __name__ == "__main__":
    update_currency_to_usd()
