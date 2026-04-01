# 145ACUQstore
Qstore management system

Q-STORE
INVENTORY MANAGEMENT SYSTEM

User Reference Manual

Australian Army Cadets  ·  IMS Version 3.2



OFFICIAL USE ONLY  ·  ALL ACCESS LOGGED  ·  PRIVACY ACT 1988 (CTH) PROTECTED
 
1. Overview
The Q-Store Inventory Management System (IMS) is a self-contained web application designed for Australian Army Cadet units. It runs entirely in a browser — no server installation is required — and provides comprehensive quartermaster functionality including inventory tracking, equipment issue and return, cadet management, QR code labelling, CSV data import, and optional OneDrive cloud synchronisation.

Key Facts
Format: Single HTML file — open in any modern browser
Data storage: Browser localStorage (local) with optional OneDrive sync
Internet required: Only for OneDrive sync and QR/scanner libraries. Core app works fully offline.
Compatible browsers: Chrome 90+, Edge 90+, Firefox 88+, Safari 14+
Policy compliance: CADET LOG 01-22, Privacy Act 1988, DA Forms 2062 & 2404

1.1  First-Run Setup
When opened for the first time the system creates a default administrator account:

Default Administrator Credentials
Username: admin
PIN: 0000
Role: CO / OC (full access)

Change this PIN immediately after first login via the Users page.
 
2. Logging In
The system presents a login screen on every page load. Sessions are stored in the browser's sessionStorage and automatically expire when the tab or browser is closed.

2.1  Sign-In Procedure
1.	Select your account from the list.
2.	Enter your 4-digit PIN using the on-screen keypad or keyboard.
3.	The system grants access according to your assigned role.

NOTE  If you make a mistake entering your PIN, tap the backspace key (⌫) to clear the last digit.
⚠  Three failed attempts are not automatically locked — contact your QM if you are unable to sign in.

2.2  Signing Out
Click your name / role badge in the top-right of the header bar. A confirmation prompt will appear. Confirm to sign out. You will be returned to the login screen.

Automatic sign-out: Closing the browser tab or window ends the session immediately. No manual sign-out is needed.
 
3. User Roles & Permissions
The system implements four roles. Permissions are enforced at every action — attempting a restricted operation displays an "Insufficient Permissions" message and the action is blocked.

Role	Intended User	Access Level
CO / OC	Commanding / Officer Commanding	Full access — read, write, delete, manage users, settings, emergency controls
QM Staff	Quartermaster and assistants	Manage inventory, issue/return, cadets, reports, audit log. Cannot delete items, manage users or change settings.
Q-Store Cadet	Cadet assistants in the Q-store	View inventory, view own loans, submit issue requests (pending QM approval), view reports. Cannot edit or delete anything.
Read-Only	Visitors, inspecting officers	View inventory and reports only. No changes of any kind.

3.1  Detailed Permission Matrix
Feature / Action	CO/OC	QM Staff	Cadet	Read-Only
View inventory & reports	✓	✓	✓	✓
View own loan record	✓	✓	✓	–
Issue equipment	✓	✓	Request only	–
Return equipment	✓	✓	–	–
Add inventory items	✓	✓	–	–
Edit inventory items	✓	✓	–	–
Delete inventory items	✓ only	–	–	–
Manage cadet register	✓	✓	–	–
CSV import	✓	✓	–	–
QR label generation	✓	✓	–	–
Audit log (full)	✓	✓	Own entries	–
Manage user accounts	✓	✓ (no delete)	–	–
Emergency access controls	✓ only	–	–	–
Settings / OneDrive config	✓ only	–	–	–
Clear all data	✓ only	–	–	–
 
4. User Management
Accessible from the Users tab. Visible to CO/OC and QM Staff roles.

4.1  Creating a User Account
4.	Navigate to Users tab.
5.	Click + Add User.
6.	Enter the full name and a unique username (no spaces).
7.	Select the appropriate Role.
8.	Optionally enter the Linked Cadet Service Number — this connects the account to a cadet record, enabling the cadet to view their own loans and submit issue requests.
9.	Enter a 4-digit PIN and confirm it.
10.	Click Create User. The account is active immediately.

NOTE  PINs are hashed before storage using a one-way algorithm. They cannot be retrieved — only reset. Never store PINs in plain text anywhere.

4.2  Resetting a PIN
11.	On the Users page, click Reset PIN next to the user.
12.	Enter and confirm the new 4-digit PIN.
13.	Click Set New PIN. The change takes effect immediately.

NOTE  Only the CO/OC can reset their own PIN. A QM can reset any other user's PIN.

4.3  Removing a User
CO/OC only. On the Users page, click Remove next to the user and confirm. This action is permanent and logged in the audit trail.

4.4  CO/OC Emergency Access Controls
These controls appear on the Users page for CO/OC only. Use in the event of a security incident, personnel change, or lost PIN.

Control	Effect	When to Use
Reset ALL User PINs to 0000	Sets every non-CO account's PIN to 0000 immediately	Suspected compromise, bulk personnel change, or forgotten PINs
Force Sign Out All Users	Invalidates all active sessions except the CO's own. Any other user's next action will force them back to the login screen.	Immediate security response — suspected unauthorised access

⚠  Both emergency actions are irreversible and are logged in the audit trail with a timestamp and the CO's name.
 
5. Inventory Register
Navigate to the Inventory Register tab. This is the master list of all controlled stores held by the unit.

5.1  Adding an Item
14.	Click + Add Item (QM Staff and CO/OC only).
15.	Enter the NSN / Stores Code and Nomenclature. These are mandatory.
16.	Select the Category, enter Authorised Quantity, On Hand Quantity, Condition, and Storage Location.
17.	Click Add to Register.

NOTE  Use the official NATO Stock Number (NSN) format: NNNN-NN-NNN-NNNN. Consistent NSN use enables accurate QR scanning and CSV import matching.

5.2  Editing an Item
Click Edit on any item row. Update fields as required and click Save Changes. QM Staff and CO/OC only.

5.3  Deleting an Item
CO/OC only. Click Del on the item row and confirm. Items with active loans cannot be deleted until all loans are returned.
⚠  Deletion is permanent. Consider marking items as Written-Off via the condition field rather than deleting, to preserve the audit record.

5.4  Filtering & Searching
•	Use the Category dropdown to filter by Uniform, Equipment, Safety, Field Stores, Medical, or Training Aids.
•	Use the search bar to filter by NSN, nomenclature, or category text.
 
6. Issue / Return Equipment
6.1  Issuing Equipment (QM Staff / CO/OC)
18.	Navigate to Issue / Return.
19.	Enter the cadet's Service Number in the Issue panel. The cadet's name, rank and platoon will auto-populate.
20.	Select the Item from the dropdown (only items with available stock appear).
21.	Set Quantity, Purpose, and Return Due Date.
22.	Add any Remarks about item condition at issue.
23.	Click Issue Equipment. A loan reference number (e.g. LN-1001) is generated automatically.

NOTE  The cadet must be registered in the Cadet Register before equipment can be issued to them.

6.2  Returning Equipment (QM Staff / CO/OC)
24.	In the Return Equipment panel, enter the cadet's Service Number.
25.	All active loans for that cadet are listed. Tick the items being returned.
26.	Select Condition on Return: Serviceable, Unserviceable (refer for repair), or Write-Off.
27.	Add Return Remarks if required (damage, missing parts, etc.).
28.	Click Process Return. Loan records are closed and stock is updated.

⚠  Items returned as Unserviceable or Write-Off require follow-up action (DA 2404). A serviceability alert will appear on the Dashboard.

6.3  Cadet Issue Requests (Q-Store Cadet role)
Cadets with a linked cadet record can submit issue requests without QM permissions:
29.	Navigate to Issue / Return. The cadet self-service panel is shown.
30.	Select the item, quantity, and purpose. Add remarks if required.
31.	Click Submit Request. The request is queued with a REQ reference number.
32.	A QM or CO/OC reviews the request on the Users page → Pending Issue Requests panel.
33.	The QM clicks Approve (sets a due date and creates the loan) or Deny.
 
7. Active Loans Register
Navigate to the Active Loans tab to view all outstanding loans.

7.1  Filtering Loans
•	All — all active loans.
•	Overdue — loans past their due date. These also appear as alerts on the Dashboard.
•	Due Within 7 Days — loans approaching due date.

7.2  Quick Return
Click Return on any row to immediately mark that loan as returned (serviceable condition). For condition-specific returns use the Issue / Return page.

7.3  Overdue Items
Overdue loans appear in red in the loans register and on the Dashboard alerts panel. Follow up with the borrower and process the return as soon as possible. All overdue items are included in the DA 2062 report.
 
8. Cadet Register
Navigate to the Cadet Register tab (QM Staff and CO/OC only).

8.1  Adding a Cadet
34.	Click + Add Cadet.
35.	Enter the Service Number (7 digits), Rank, Surname, and Given Name.
36.	Optionally enter Platoon/Section, shirt size, trouser size, and boot size.
37.	Click Add Cadet.

NOTE  Sizing data is used for kit issue planning and is included in the Cadet Kit List report.

8.2  Removing a Cadet
Click Remove on the cadet row and confirm. Cadets with active loans cannot be removed until all equipment is returned.
 
9. QR Codes & Labels
Navigate to the QR / Labels tab.

9.1  Generating & Printing Labels
38.	Select the label type from the dropdown: Inventory Items, Storage Locations, Cadet ID Cards, or Active Loans.
39.	Use the search/filter to narrow the list if needed.
40.	Click individual cards to select them, or use Select All.
41.	Click ⎙ Print Selected. A print-ready label sheet is generated. Use your browser's Print dialog (Ctrl+P / Cmd+P).

NOTE  Labels print in black on white at 120×120px QR code size, suitable for adhesive label sheets. For shelf labels use Storage Location type. For kit bags use Cadet ID Card type.

9.2  Scanning QR Codes
The scanner panel supports two input methods:

Method	How to Use	Best For
USB Barcode Scanner (Keyboard Wedge)	Click the scanner input field. Scan the QR code with your USB scanner. The code is entered automatically and processed when Enter is received.	Desktop / fixed Q-store setup
Camera (Device)	Click Start Camera. Point the camera at a QR code. Scanning happens automatically when a code is detected.	Mobile phone or tablet in the field

9.3  Scan Actions
After a successful scan, the system identifies the QR type and presents relevant information and action buttons:

QR Type	Information Shown	Quick Actions
Item	Name, NSN, available quantity, condition, location	Issue This Item
Cadet ID	Name, rank, platoon, items on loan	Issue to Cadet / Return Items
Loan Receipt	Loan reference, item, due date, borrower	Process Return Now
Storage Location	Location name, all items stored there	(view only)
 
10. CSV Import
Navigate to the CSV Import tab (QM Staff and CO/OC only). Use this to bulk-load pre-existing data from spreadsheets or other systems.

10.1  Import Procedure
42.	Select the import type: Inventory Items, Cadet Register, or Loan Records.
43.	Click ⬇ Download Template CSV and open it in Excel or your spreadsheet application to see the required column format.
44.	Prepare your data file with matching columns. Save as .csv (UTF-8 encoding recommended).
45.	Click the drop zone or drag your CSV file onto it. The system shows a preview of the first 8 rows.
46.	Review the Column Mapping panel. The system auto-detects columns by header name — verify each mapping and correct any mismatches.
47.	Click ⬆ Import Data.
48.	Review the import result: records added, updated, and skipped are reported.

Import Behaviour
New records: Added to the register.
Existing records: Updated if the NSN (items) or Service Number (cadets) matches an existing record.
Skipped rows: Rows missing required fields or with duplicate loan references are skipped.
Audit log: Every import is logged with a count of added/updated/skipped records.

⚠  Always export a backup (Settings → Export Local) before importing large datasets.
 
11. Reports & DA Forms
Navigate to the Reports & DA Forms tab.

Report	Form Reference	Description
DA 2062 / Full Stocktake	DA Form 2062	Complete inventory with authorised vs on-hand quantities, variance column, and all condition states.
Active Issue Report	Loans Register	All outstanding loans including borrower, due date, and overdue status.
Equipment Inspection	DA Form 2404	All unserviceable and written-off items with recommended action and CO/OC/QM signature blocks.
Cadet Kit List	Individual Kit State	Per-cadet kit accountability view.
Annual Stocktake	Full Stocktake	Comprehensive authorised vs on-hand comparison for annual audit.
Audit Trail	Transaction History	Full transaction log for the reporting period.

All reports are generated in-browser and can be printed or saved as PDF using your browser's print function (Ctrl+P / Cmd+P).

ADF Retention Requirements (CADET LOG 01-22)
Issue / Return records: 7 years post activity
Write-off records: 10 years
Annual Stocktake reports: 7 years

Physical copies of DA Forms must be counter-signed by the QM and OC/CO before filing.
 
12. OneDrive Cloud Synchronisation
Navigate to Settings (CO/OC only). OneDrive sync allows data to be stored on your personal Microsoft OneDrive and accessed from multiple devices.

⚠  OneDrive sync requires the app to be served over HTTPS (e.g. GitHub Pages). It will NOT work when opening the file directly from the filesystem (file://).

12.1  Azure App Registration (One-Time Setup)
49.	Go to portal.azure.com and sign in with your Microsoft account.
50.	Navigate to Microsoft Entra ID → App registrations → New registration.
51.	Name the app (e.g. QStore IMS). Under Supported account types, select "Accounts in any organizational directory and personal Microsoft accounts".
52.	Click Register.
53.	Go to Authentication → Add a platform → Single-page application (SPA).
54.	Set the Redirect URI to the exact URL shown in Settings → OneDrive Sync → Your Redirect URI box. Click Configure.
55.	Copy the Application (client) ID from the app Overview page.

12.2  Enabling Sync
56.	In Settings → OneDrive Sync, paste the Client ID into the Azure Application (Client) ID field.
57.	Set the OneDrive folder path (e.g. QStore/1ACTU) and filename (default: qstore_data.json).
58.	Click 💾 Save & Initialise.
59.	Click 🔑 Sign In to Microsoft. A popup window appears — sign in with your Microsoft account.
60.	Once signed in, click ⬆ Sync Now to perform the first upload.

NOTE  After the initial sign-in, sessions are cached. The app will resume without requiring sign-in again until the session expires or you sign out.

12.3  Auto-Sync
With auto-sync enabled (default), data is uploaded to OneDrive automatically 5 seconds after every change. The sync status pill in the header shows the current state:

Status Pill	Meaning
☁ NOT CONFIGURED	No Client ID entered.
☁ SIGN IN REQUIRED	Client ID saved. Click to sign in.
☁ UNSAVED	Changes pending — upload will occur in ~5 seconds.
☁ SYNCING…	Upload in progress.
☁ SYNCED 14:32:07	Last successful upload time.
☁ SYNC FAILED	Upload error — check the sync log in Settings.
 
13. Settings & Data Management
Navigate to Settings (CO/OC only).

13.1  Unit Details
Set the unit name, short code, QM name and rank, CO name, and state/territory. These values appear on all generated reports and the login screen.

13.2  Exporting Data
Click ⬇ Export Local (JSON) to download a complete backup of all data as a JSON file. The filename includes the unit code and date.

NOTE  Export a backup before every major activity, at least monthly, and before any system upgrade.

13.3  Importing Data (Restore)
Click ⬆ Import Local and select a previously exported JSON backup file. This restores all data from that backup. User accounts are also restored.
⚠  Importing a backup overwrites all current data. Export a backup of the current data first.

13.4  Clearing Data
CO/OC only. Click ⚠ Clear All Data and confirm twice. This permanently erases all inventory items, cadets, loans, and audit log entries. User accounts are preserved. Use this when setting up the system for a new unit or financial year.
 
14. Upgrading the Application
Because all data is stored in the browser's localStorage (tied to the URL, not the file), upgrading is simply a matter of replacing the HTML file. Data is not affected.

14.1  Upgrade Procedure (GitHub Pages)
61.	Export a data backup from Settings → Export Local as a precaution.
62.	Go to your GitHub repository.
63.	Click Add file → Upload files. Upload the new qstore_inventory.html.
64.	Commit the change. GitHub Pages deploys within 60 seconds.
65.	Open the same URL in your browser — data loads automatically.
66.	Verify data integrity. If anything is wrong, use Import Local to restore from backup.

14.2  Upgrade Procedure (Local Server)
67.	Export a data backup.
68.	Replace the HTML file in the folder with the new version.
69.	Refresh the browser — data is preserved.

⚠  Never open the app from a different URL after upgrading. Data is tied to the exact URL (origin + path). A URL change means a new localStorage scope and the previous data will not be visible.
 
15. Audit Log
Navigate to the Audit Log tab.

Every significant action is recorded with a timestamp, action type, description, and the name of the logged-in user who performed it. The audit log cannot be edited or deleted by any user.

Action Type	Logged Events
LOGIN	User sign-in and sign-out events
ISSUE	Equipment issued to a cadet, including loan reference and quantity
RETURN	Equipment returned, including condition on return
ADD	Inventory items added, cadet records created, CSV imports, user accounts created
ADJUST	Item edits, stock corrections, PIN resets, user changes, emergency actions
WRITE-OFF	Items written off as unfit for service

Use the filter dropdown to show only specific action types. Use the search bar to search within descriptions.
 
16. Troubleshooting
Problem	Likely Cause	Solution
"msal is not defined" error	MSAL library CDN blocked or failed to load	Check internet connection and reload. The app uses a fallback CDN automatically.
redirect_uri_mismatch error from Microsoft	Azure portal redirect URI does not match the browser URL	Go to Settings → OneDrive Sync. Copy the Your Redirect URI value and add it exactly to Azure portal → Authentication → SPA.
OneDrive sync shows SYNC FAILED	Token expired, network error, or Graph API error	Click the sync pill to retry. Check the Sync Log in Settings for the error detail. If token expired, sign in again.
Data appears missing after opening app	File opened from a different URL or different browser	Always open from the same URL. Use Import Local to restore from backup if needed.
Camera scanner not working	Browser denied camera access, or no rear camera	Allow camera access in browser settings. Use USB scanner as alternative.
QR codes not generating	QR library CDN failed to load	Check internet connection. The QR library loads on demand from jsDelivr.
Cannot log in — PIN not accepted	Wrong PIN entered	Contact your QM or CO/OC to reset your PIN via the Users page.
Signed out unexpectedly	CO/OC used Force Sign Out, or session expired	Sign in again normally. Contact your CO/OC if this recurs.
 
17. Policy & Compliance Reference
Reference	Scope
CADET LOG 01-22	Cadet Logistics Instructions — data retention schedules
AAFC/AACC Corps Standing Orders	Q-Store Management procedures
DFENCE Procurement Policy Framework 2023	Procurement and stores accountability
DA Form 2062	Hand Receipt / Annex — equipment accountability
DA Form 2404	Equipment Inspection Record — unserviceable items
Privacy Act 1988 (Cth) — APP 11	Cadet personal data handling and security
AAC Administrative Instructions Vol 2 Ch 4	Administrative procedures

17.1  Data Sovereignty Notice
Cadet personal information (names, service numbers, sizing data) is protected under the Privacy Act 1988 (Cth) and ADF data handling policies.

•	Data stored in browser localStorage remains on the local device only.
•	OneDrive sync transmits data only to your own Microsoft account or tenancy.
•	Ensure your OneDrive tenancy complies with unit data handling requirements before enabling sync.
•	Do not share the OneDrive sync file URL publicly.

17.2  Security Considerations
•	Change the default administrator PIN (0000) immediately after first deployment.
•	Assign the minimum role necessary to each user.
•	Conduct a user account review after any personnel change.
•	Use the Force Sign Out control immediately if unauthorised access is suspected.
•	Export and securely store data backups at least monthly.
•	The app is intended for OFFICIAL USE ONLY. Do not use on personal devices without command approval.



Q-Store IMS v3.2  ·  Australian Army Cadets  ·  OFFICIAL USE ONLY
