import os
import logging
from google.oauth2 import service_account
from googleapiclient.discovery import build
from config.settings import settings
from typing import List, Dict

logger = logging.getLogger("google_sheets")

class GoogleSheetsSync:
    def __init__(self):
        self.spreadsheet_id = settings.google_sheet_id
        self.creds_file = settings.google_sheets_credentials_file
        self.service = None
        self._authenticate()

    def _authenticate(self):
        if not self.spreadsheet_id:
            logger.warning("GOOGLE_SHEET_ID not set. Google Sheets sync disabled.")
            return

        if not os.path.exists(self.creds_file):
            logger.warning(f"Credentials file {self.creds_file} not found. Google Sheets sync disabled.")
            return

        try:
            scopes = ['https://www.googleapis.com/auth/spreadsheets']
            creds = service_account.Credentials.from_service_account_file(
                self.creds_file, scopes=scopes)
            self.service = build('sheets', 'v4', credentials=creds)
            logger.info("Successfully authenticated with Google Sheets API")
        except Exception as e:
            logger.error(f"Failed to authenticate with Google Sheets: {e}")

    def sync_scanners(self, scanners: List[Dict]):
        if not self.service:
            return

        try:
            values = [["ID", "Name", "Status", "Last Scan", "Signals Generated"]]
            for s in scanners:
                values.append([
                    s.get('id'),
                    s.get('name'),
                    'Active' if s.get('active') else 'Inactive',
                    s.get('last_scan'),
                    s.get('signals_generated')
                ])

            body = {'values': values}
            range_name = 'Scanners!A1'
            
            # Ensure the sheet exists or handle error
            self.service.spreadsheets().values().update(
                spreadsheetId=self.spreadsheet_id, range=range_name,
                valueInputOption='RAW', body=body).execute()
            logger.info("Synced scanners to Google Sheets")
        except Exception as e:
            logger.error(f"Error syncing scanners: {e}")

    def sync_signals(self, signals: List[Dict]):
        if not self.service:
            return

        try:
            values = [["Time", "Symbol", "Type", "Confidence", "Price", "Condition"]]
            for s in signals:
                values.append([
                    s.get('timestamp'),
                    s.get('symbol'),
                    s.get('signal_type'),
                    s.get('confidence'),
                    s.get('price'),
                    s.get('condition')
                ])

            body = {'values': values}
            # We use Append to keep history for signals
            range_name = 'Signals!A1'
            
            self.service.spreadsheets().values().append(
                spreadsheetId=self.spreadsheet_id, range=range_name,
                valueInputOption='RAW', body=body).execute()
            logger.info("Synced signals to Google Sheets")
        except Exception as e:
            logger.error(f"Error syncing signals: {e}")

# Global instance
sheets_sync = GoogleSheetsSync()
