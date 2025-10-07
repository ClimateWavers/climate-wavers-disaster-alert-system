"""
Analytics and trend analysis for disaster data
"""
from django.db.models import Count, Q, Avg, Max, Min
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Disaster, DisasterAlert
import json

class DisasterAnalytics:
    """Analytics class for disaster data analysis"""
    
    @staticmethod
    def get_disaster_trends(days=30):
        """Get disaster trends over the last N days"""
        end_date = timezone.now()
        start_date = end_date - timedelta(days=days)
        
        # Daily disaster counts
        daily_counts = Disaster.objects.filter(
            created_at__gte=start_date
        ).extra(
            select={'day': 'date(created_at)'}
        ).values('day').annotate(
            count=Count('id')
        ).order_by('day')
        
        return list(daily_counts)
    
    @staticmethod
    def get_severity_distribution():
        """Get distribution of disasters by severity"""
        severity_dist = Disaster.objects.values('severity').annotate(
            count=Count('id')
        ).order_by('severity')
        
        return list(severity_dist)
    
    @staticmethod
    def get_type_distribution():
        """Get distribution of disasters by type"""
        type_dist = Disaster.objects.values('disaster_type').annotate(
            count=Count('id')
        ).order_by('disaster_type')
        
        return list(type_dist)
    
    @staticmethod
    def get_country_analysis():
        """Get disaster analysis by country"""
        country_analysis = Disaster.objects.values('country').annotate(
            total_disasters=Count('id'),
            urgent_disasters=Count('id', filter=Q(is_urgent=True)),
            active_disasters=Count('id', filter=Q(is_active=True))
        ).order_by('-total_disasters')[:20]
        
        return list(country_analysis)
    
    @staticmethod
    def get_impact_analysis():
        """Get impact analysis (casualties, injured, displaced)"""
        impact_stats = Disaster.objects.aggregate(
            total_casualties=Avg('casualties'),
            total_injured=Avg('injured'),
            total_displaced=Avg('displaced'),
            max_casualties=Max('casualties'),
            max_injured=Max('injured'),
            max_displaced=Max('displaced')
        )
        
        return impact_stats
    
    @staticmethod
    def get_alert_analysis():
        """Get alert analysis"""
        alert_stats = DisasterAlert.objects.aggregate(
            total_alerts=Count('id'),
            active_alerts=Count('id', filter=Q(is_active=True)),
            urgent_alerts=Count('id', filter=Q(alert_type='urgent'))
        )
        
        return alert_stats
    
    @staticmethod
    def get_geographic_hotspots():
        """Get geographic hotspots for disasters"""
        hotspots = Disaster.objects.exclude(
            latitude__isnull=True,
            longitude__isnull=True
        ).values('country', 'region', 'latitude', 'longitude').annotate(
            disaster_count=Count('id'),
            urgent_count=Count('id', filter=Q(is_urgent=True))
        ).order_by('-disaster_count')[:50]
        
        return list(hotspots)
    
    @staticmethod
    def get_time_series_analysis():
        """Get time series analysis for trends"""
        # Last 7 days
        end_date = timezone.now()
        start_date = end_date - timedelta(days=7)
        
        hourly_data = Disaster.objects.filter(
            created_at__gte=start_date
        ).extra(
            select={'hour': 'extract(hour from created_at)'}
        ).values('hour').annotate(
            count=Count('id')
        ).order_by('hour')
        
        return list(hourly_data)
    
    @staticmethod
    def get_prediction_data():
        """Get data for disaster prediction models"""
        # This could be used for machine learning predictions
        disasters = Disaster.objects.filter(
            created_at__gte=timezone.now() - timedelta(days=90)
        ).values(
            'disaster_type',
            'severity',
            'country',
            'latitude',
            'longitude',
            'casualties',
            'injured',
            'displaced',
            'is_urgent',
            'is_active'
        )
        
        return list(disasters)
    
    @staticmethod
    def generate_comprehensive_report():
        """Generate a comprehensive analytics report"""
        report = {
            'timestamp': timezone.now().isoformat(),
            'trends': DisasterAnalytics.get_disaster_trends(30),
            'severity_distribution': DisasterAnalytics.get_severity_distribution(),
            'type_distribution': DisasterAnalytics.get_type_distribution(),
            'country_analysis': DisasterAnalytics.get_country_analysis(),
            'impact_analysis': DisasterAnalytics.get_impact_analysis(),
            'alert_analysis': DisasterAnalytics.get_alert_analysis(),
            'geographic_hotspots': DisasterAnalytics.get_geographic_hotspots(),
            'time_series': DisasterAnalytics.get_time_series_analysis()
        }
        
        return report




