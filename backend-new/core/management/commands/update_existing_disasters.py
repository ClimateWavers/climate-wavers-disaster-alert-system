from django.core.management.base import BaseCommand
from django.utils import timezone
from core.models import Disaster
import re
from datetime import datetime

class Command(BaseCommand):
    help = 'Update existing disasters with better location and affected number extraction'

    def handle(self, *args, **options):
        self.stdout.write("Updating existing disasters...")
        
        # Get all disasters that need updating
        disasters = Disaster.objects.all()
        
        updated_count = 0
        
        for disaster in disasters:
            updated = False
            
            # Extract location from title if database fields are empty
            if not disaster.city and not disaster.region and disaster.country in ['Unknown', '']:
                extracted_location = self.extract_location_from_title(disaster.title)
                if extracted_location:
                    disaster.city = extracted_location
                    updated = True
            
            # Extract affected numbers from title and description
            if not disaster.casualties and not disaster.injured and not disaster.displaced:
                affected_numbers = self.extract_affected_numbers(f"{disaster.title} {disaster.description or ''}")
                if affected_numbers['casualties']:
                    disaster.casualties = affected_numbers['casualties']
                    updated = True
                if affected_numbers['injured']:
                    disaster.injured = affected_numbers['injured']
                    updated = True
                if affected_numbers['displaced']:
                    disaster.displaced = affected_numbers['displaced']
                    updated = True
            
            if updated:
                disaster.save()
                updated_count += 1
                self.stdout.write(f"Updated disaster: {disaster.title}")
        
        self.stdout.write(f"Successfully updated {updated_count} disasters")

    def extract_location_from_title(self, title):
        """Extract location from title using improved patterns"""
        if not title:
            return None
        
        # Common patterns for location extraction
        patterns = [
            # Specific location patterns
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+to\s+clear',  # "Poway to clear"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\'s\s+president',  # "Madagascar's president"
            r'^Removal\s+of\s+(\d+)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',  # "Removal of 274 Flooded Cars"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+apologizes',  # "Steve Cohen apologizes"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+fire',  # "Twins fire"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+displaced',  # "Residents of 36 units displaced"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Are\s+Popping',  # "Why RVs Are Popping"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+after\s+([A-Z][a-z]+)',  # "A year after Helene"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\'s\s+Desire',  # "Trump's Desire"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+raffling',  # "Couple raffling"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+fire\s+manager',  # "Twins fire manager"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+plan\s+luxury',  # "Democrats plan luxury"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+and\s+([A-Z][a-z]+)',  # "How Imelda and Humberto"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+of\s+church',  # "Father of church"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+\|\s+([A-Z][a-z]+)',  # "Serie A | Genoa"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+hurdle',  # "The hurdle dampening"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Is\s+Betting',  # "Why Realme Is Betting"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+administration',  # "Trump administration"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Grows',  # "Pressure Grows"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+health\s+ministry',  # "Gaza health ministry"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+living\s+near',  # "People living near"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+ordered',  # "Evacuations ordered"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+is\s+on\s+fire',  # "Christian Pulisic is on fire"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+church\s+shooting',  # "Michigan church shooting"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Fired',  # "Rocco Baldelli Fired"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+and\s+Family',  # "Veteran and Family"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s+vehicle\s+fire',  # "Explosion, vehicle fire"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+fire\s+veteran',  # "Giants fire veteran"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+after\s+Bio\s+Lab',  # "A year after Bio Lab"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+church\s+shooting',  # "Michigan church shooting"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Storm',  # "Tropical Storm"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\'s\s+"Fire\s+Hose"',  # "Michael Mann's Fire Hose"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+could\s+get',  # "Windows 11 could get"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+Agrees',  # "Netanyahu Agrees"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+declares',  # "Maduro declares"
            r'^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+leaning',  # "Hamas leaning"
            
            # Standard location patterns
            r'in\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',  # "in City"
            r'at\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',  # "at City"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2,})',  # "City, State/Country"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+([A-Z]{2,})',  # "City State/Country"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+in\s+([A-Z][a-z]+)',  # "Event in City"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+at\s+([A-Z][a-z]+)',  # "Event at City"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',  # "City State"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+([A-Z][a-z]+)',  # "City State"
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+([A-Z]{2,})',  # "City State"
        ]
        
        for pattern in patterns:
            match = re.search(pattern, title, re.IGNORECASE)
            if match:
                # Return the first captured group or the full match
                location = match.group(1) or match.group(0)
                # Clean up the location string
                cleaned = location.strip().replace(r'[^\w\s]', '')
                # Only return if it's not too short and not a common word
                if len(cleaned) > 2 and cleaned.lower() not in ['the', 'and', 'for', 'with', 'from', 'to', 'of', 'in', 'at', 'on', 'removal', 'president', 'government', 'fire', 'apologizes', 'underway', 'twins', 'steve', 'year', 'after', 'desire', 'raffling', 'manager', 'plan', 'luxury', 'hurdle', 'betting', 'administration', 'grows', 'health', 'ministry', 'living', 'near', 'ordered', 'church', 'shooting', 'fired', 'family', 'vehicle', 'veteran', 'storm', 'hose', 'could', 'get', 'agrees', 'declares', 'leaning']:
                    return cleaned
        
        return None

    def extract_affected_numbers(self, text):
        """Extract casualty, injury, and displacement numbers from text"""
        text_lower = text.lower()
        affected_numbers = {
            'casualties': None,
            'injured': None,
            'displaced': None
        }
        
        # Patterns for casualties/deaths
        casualty_patterns = [
            r'(\d+)\s*(?:killed|dead|deaths?|casualties?|fatalities?)',
            r'(?:killed|dead|deaths?|casualties?|fatalities?)\s*(?:of\s*)?(\d+)',
            r'(\d+)\s*(?:people\s*)?(?:were\s*)?(?:killed|dead|died)',
            r'(\d+)\s*(?:lives?\s*)?(?:lost|lost\s*lives?)'
        ]
        
        # Patterns for injured
        injured_patterns = [
            r'(\d+)\s*(?:injured|wounded|hurt)',
            r'(?:injured|wounded|hurt)\s*(?:of\s*)?(\d+)',
            r'(\d+)\s*(?:people\s*)?(?:were\s*)?(?:injured|wounded|hurt)'
        ]
        
        # Patterns for displaced/evacuated
        displaced_patterns = [
            r'(\d+)\s*(?:displaced|evacuated|homeless)',
            r'(?:displaced|evacuated|homeless)\s*(?:of\s*)?(\d+)',
            r'(\d+)\s*(?:people\s*)?(?:were\s*)?(?:displaced|evacuated|forced\s*to\s*flee)',
            r'(\d+)\s*(?:families?\s*)?(?:displaced|evacuated)'
        ]
        
        # Extract casualties
        for pattern in casualty_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    affected_numbers['casualties'] = int(match.group(1))
                    break
                except (ValueError, IndexError):
                    continue
        
        # Extract injured
        for pattern in injured_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    affected_numbers['injured'] = int(match.group(1))
                    break
                except (ValueError, IndexError):
                    continue
        
        # Extract displaced
        for pattern in displaced_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    affected_numbers['displaced'] = int(match.group(1))
                    break
                except (ValueError, IndexError):
                    continue
        
        # Special patterns for specific disasters
        # Look for patterns like "50 Palestinians killed" or "36 units displaced"
        specific_patterns = [
            r'(\d+)\s*(?:Palestinians?|people|residents?|units?)\s*(?:killed|displaced)',
            r'(\d+)\s*(?:units?|families?|residents?)\s*(?:displaced|evacuated)',
            r'(\d+)\s*(?:people|residents?|civilians?)\s*(?:killed|dead|injured)'
        ]
        
        for pattern in specific_patterns:
            match = re.search(pattern, text_lower)
            if match:
                try:
                    number = int(match.group(1))
                    # Determine if it's casualties or displaced based on context
                    if 'killed' in match.group(0) or 'dead' in match.group(0):
                        affected_numbers['casualties'] = number
                    elif 'displaced' in match.group(0) or 'evacuated' in match.group(0):
                        affected_numbers['displaced'] = number
                    elif 'injured' in match.group(0) or 'hurt' in match.group(0):
                        affected_numbers['injured'] = number
                    break
                except (ValueError, IndexError):
                    continue
        
        return affected_numbers




