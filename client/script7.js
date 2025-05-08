const symptomsDict = {
    'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4,
    'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9,
    'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13,
    'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18,
    'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22,
    'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27,
    'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32,
    'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37,
    'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42,
    'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46,
    'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50,
    'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54,
    'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58,
    'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61,
    'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66,
    'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70,
    'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74,
    'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78,
    'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82,
    'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86,
    'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89,
    'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92,
    'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96,
    'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100,
    'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103,
    'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107,
    'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110,
    'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113,
    'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116,
    'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119,
    'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123,
    'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127,
    'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131
};

const diseasesList = {
    15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis',
    14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes',
    17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension', 30: 'Migraine',
    7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice',
    29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A',
    19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E',
    3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia',
    13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins',
    26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis',
    5: 'Arthritis', 0: '(vertigo) Paroymsal Positional Vertigo', 2: 'Acne',
    38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'
};

const description = {
    'Fungal infection': 'Fungal infection is a common skin condition caused by fungi.',
    'Allergy': 'Allergy is an immune system reaction to a substance in the environment.',
    'GERD': 'GERD (Gastroesophageal Reflux Disease) is a digestive disorder that affects the lower esophageal sphincter.',
    'Chronic cholestasis': 'Chronic cholestasis is a condition where bile flow from the liver is reduced for a prolonged period.',
    'Drug Reaction': 'Drug Reaction occurs when the body reacts adversely to a medication.',
    'Peptic ulcer diseae': 'Peptic ulcer disease involves sores that develop on the inner lining of the stomach and small intestine.',
    'AIDS': 'AIDS (Acquired Immunodeficiency Syndrome) is a disease caused by HIV that weakens the immune system.',
    'Diabetes': 'Diabetes is a chronic condition that affects how the body processes blood sugar.',
    'Gastroenteritis': 'Gastroenteritis is an inflammation of the stomach and intestines, typically caused by a virus or bacteria.',
    'Bronchial Asthma': 'Bronchial Asthma is a respiratory condition characterized by inflammation of the airways.',
    'Hypertension': 'Hypertension, or high blood pressure, is a common cardiovascular condition.',
    'Migraine': 'Migraine is a type of headache that often involves severe pain and sensitivity to light and sound.',
    'Cervical spondylosis': 'Cervical spondylosis is a degenerative condition of the cervical spine.',
    'Paralysis (brain hemorrhage)': 'Paralysis (brain hemorrhage) refers to the loss of muscle function due to bleeding in the brain.',
    'Jaundice': 'Jaundice is a yellow discoloration of the skin and eyes, often indicating liver problems.',
    'Malaria': 'Malaria is a mosquito-borne infectious disease affecting humans and other animals.',
    'Chicken pox': 'Chicken pox is a highly contagious viral infection causing an itchy rash.',
    'Dengue': 'Dengue is a mosquito-borne viral infection causing flu-like symptoms.',
    'Typhoid': 'Typhoid is a bacterial infection that can lead to a high fever and gastrointestinal symptoms.',
    'hepatitis A': 'Hepatitis A is a viral liver disease.',
    'Hepatitis B': 'Hepatitis B is a viral infection that attacks the liver.',
    'Hepatitis C': 'Hepatitis C is a viral infection that causes liver inflammation.',
    'Hepatitis D': 'Hepatitis D is a serious liver disease caused by the hepatitis D virus.',
    'Hepatitis E': 'Hepatitis E is a viral infection that causes liver inflammation.',
    'Alcoholic hepatitis': 'Alcoholic hepatitis is inflammation of the liver due to alcohol consumption.',
    'Tuberculosis': 'Tuberculosis is a bacterial infection that primarily affects the lungs.',
    'Common Cold': 'Common Cold is a viral infection of the upper respiratory tract.',
    'Pneumonia': 'Pneumonia is an inflammatory condition affecting the air sacs in the lungs.',
    'Dimorphic hemmorhoids(piles)': 'Dimorphic hemmorhoids(piles) is a condition characterized by swollen blood vessels in the rectum.',
    'Heart attack': 'Heart attack is a sudden and severe reduction in blood flow to the heart muscle.',
    'Varicose veins': 'Varicose veins are enlarged, twisted veins that usually appear on the legs.',
    'Hypothyroidism': 'Hypothyroidism is a condition where the thyroid gland doesn\'t produce enough thyroid hormone.',
    'Hyperthyroidism': 'Hyperthyroidism is a condition where the thyroid gland produces too much thyroid hormone.',
    'Hypoglycemia': 'Hypoglycemia is a condition characterized by abnormally low blood sugar levels.',
    'Osteoarthristis': 'Osteoarthristis is a degenerative joint disease that affects the cartilage in joints.',
    'Arthritis': 'Arthritis is inflammation of one or more joints, causing pain and stiffness.',
    '(vertigo) Paroymsal Positional Vertigo': 'Paroxysmal Positional Vertigo is a type of dizziness caused by specific head movements.',
    'Acne': 'Acne is a skin condition that occurs when hair follicles become clogged with oil and dead skin cells.',
    'Urinary tract infection': 'Urinary tract infection is an infection in any part of the urinary system.',
    'Psoriasis': 'Psoriasis is a chronic skin condition characterized by red, itchy, and scaly patches.',
    'Impetigo': 'Impetigo is a highly contagious skin infection causing red sores that can break open.'
};

const precautions = {
    'Drug Reaction': ['Stop irritation', 'Consult nearest hospital', 'Stop taking drug', 'Follow up'],
    'Malaria': ['Consult nearest hospital', 'Avoid oily food', 'Avoid non veg food', 'Keep mosquitos out'],
    'Allergy': ['Apply calamine', 'Cover area with bandage', 'Use ice to compress itching'],
    'Hypothyroidism': ['Reduce stress', 'Exercise', 'Eat healthy', 'Get proper sleep'],
    'Psoriasis': ['Wash hands with warm soapy water', 'Stop bleeding using pressure', 'Consult doctor', 'Salt baths'],
    'GERD': ['Avoid fatty spicy food', 'Avoid lying down after eating', 'Maintain healthy weight', 'Exercise'],
    'Chronic cholestasis': ['Cold baths', 'Anti itch medicine', 'Consult doctor', 'Eat healthy'],
    'hepatitis A': ['Consult nearest hospital', 'Wash hands thoroughly', 'Avoid fatty spicy food', 'Medication'],
    'Osteoarthristis': ['Acetaminophen', 'Consult nearest hospital', 'Follow up', 'Salt baths'],
    '(vertigo) Paroymsal Positional Vertigo': ['Lie down', 'Avoid sudden change in body', 'Avoid abrupt head movement', 'Relax'],
    'Hypoglycemia': ['Lie down on side', 'Check pulse', 'Drink sugary drinks', 'Consult doctor'],
    'Acne': ['Bath twice', 'Avoid fatty spicy food', 'Drink plenty of water', 'Avoid too many products'],
    'Diabetes': ['Have balanced diet', 'Exercise', 'Consult doctor', 'Follow up'],
    'Impetigo': ['Soak affected area in warm water', 'Use antibiotics', 'Remove scabs with wet compressed cloth', 'Consult doctor'],
    'Hypertension': ['Meditation', 'Salt baths', 'Reduce stress', 'Get proper sleep'],
    'Peptic ulcer diseae': ['Avoid fatty spicy food', 'Consume probiotic food', 'Eliminate milk', 'Limit alcohol'],
    'Dimorphic hemmorhoids(piles)': ['Avoid fatty spicy food', 'Consume witch hazel', 'Warm bath with epsom salt', 'Consume aloe vera juice'],
    'Common Cold': ['Drink vitamin C rich drinks', 'Take vapor', 'Avoid cold food', 'Keep fever in check'],
    'Chicken pox': ['Use neem in bathing', 'Consume neem leaves', 'Take vaccine', 'Avoid public places'],
    'Cervical spondylosis': ['Use heating pad or cold pack', 'Exercise', 'Take OTC pain reliever', 'Consult doctor'],
    'Hyperthyroidism': ['Eat healthy', 'Massage', 'Use lemon balm', 'Take radioactive iodine treatment'],
    'Urinary tract infection': ['Drink plenty of water', 'Increase vitamin C intake', 'Drink cranberry juice', 'Take probiotics'],
    'Varicose veins': ['Lie down flat and raise the leg high', 'Use ointments', 'Use vein compression', 'Don\'t stand still for long'],
    'AIDS': ['Avoid open cuts', 'Wear PPE if possible', 'Consult doctor', 'Follow up'],
    'Paralysis (brain hemorrhage)': ['Massage', 'Eat healthy', 'Exercise', 'Consult doctor'],
    'Typhoid': ['Eat high calorie vegetables', 'Antibiotic therapy', 'Consult doctor', 'Medication'],
    'Hepatitis B': ['Consult nearest hospital', 'Vaccination', 'Eat healthy', 'Medication'],
    'Fungal infection': ['Bath twice', 'Use Dettol or neem in bathing water', 'Keep infected area dry', 'Use clean clothes'],
    'Hepatitis C': ['Consult nearest hospital', 'Vaccination', 'Eat healthy', 'Medication'],
    'Migraine': ['Meditation', 'Reduce stress', 'Use polaroid glasses in sun', 'Consult doctor'],
    'Bronchial Asthma': ['Switch to loose clothing', 'Take deep breaths', 'Get away from trigger', 'Seek help'],
    'Alcoholic hepatitis': ['Stop alcohol consumption', 'Consult doctor', 'Medication', 'Follow up'],
    'Jaundice': ['Drink plenty of water', 'Consume milk thistle', 'Eat fruits and high fibrous food', 'Medication'],
    'Hepatitis E': ['Stop alcohol consumption', 'Rest', 'Consult doctor', 'Medication'],
    'Dengue': ['Drink papaya leaf juice', 'Avoid fatty spicy food', 'Keep mosquitos away', 'Keep hydrated'],
    'Hepatitis D': ['Consult doctor', 'Medication', 'Eat healthy', 'Follow up'],
    'Heart attack': ['Call ambulance', 'Chew or swallow aspirin', 'Keep calm'],
    'Pneumonia': ['Consult doctor', 'Medication', 'Rest', 'Follow up'],
    'Arthritis': ['Exercise', 'Use hot and cold therapy', 'Try acupuncture', 'Massage'],
    'Gastroenteritis': ['Stop eating solid food for while', 'Try taking small sips of water', 'Rest', 'Ease back into eating'],
    'Tuberculosis': ['Cover mouth', 'Consult doctor', 'Medication', 'Rest']
};

const medications = {
    'Fungal infection': ['Antifungal Cream', 'Fluconazole', 'Terbinafine', 'Clotrimazole', 'Ketoconazole'],
    'Allergy': ['Antihistamines', 'Decongestants', 'Epinephrine', 'Corticosteroids', 'Immunotherapy'],
    'GERD': ['Proton Pump Inhibitors (PPIs)', 'H2 Blockers', 'Antacids', 'Prokinetics', 'Antibiotics'],
    'Chronic cholestasis': ['Ursodeoxycholic acid', 'Cholestyramine', 'Methotrexate', 'Corticosteroids', 'Liver transplant'],
    'Drug Reaction': ['Antihistamines', 'Epinephrine', 'Corticosteroids', 'Antibiotics', 'Antifungal Cream'],
    'Peptic ulcer diseae': ['Antibiotics', 'Proton Pump Inhibitors (PPIs)', 'H2 Blockers', 'Antacids', 'Cytoprotective agents'],
    'AIDS': ['Antiretroviral drugs', 'Protease inhibitors', 'Integrase inhibitors', 'Entry inhibitors', 'Fusion inhibitors'],
    'Diabetes': ['Insulin', 'Metformin', 'Sulfonylureas', 'DPP-4 inhibitors', 'GLP-1 receptor agonists'],
    'Gastroenteritis': ['Antibiotics', 'Antiemetic drugs', 'Antidiarrheal drugs', 'IV fluids', 'Probiotics'],
    'Bronchial Asthma': ['Bronchodilators', 'Inhaled corticosteroids', 'Leukotriene modifiers', 'Mast cell stabilizers', 'Anticholinergics'],
    'Hypertension': ['Antihypertensive medications', 'Diuretics', 'Beta-blockers', 'ACE inhibitors', 'Calcium channel blockers'],
    'Migraine': ['Analgesics', 'Triptans', 'Ergotamine derivatives', 'Preventive medications', 'Biofeedback'],
    'Cervical spondylosis': ['Pain relievers', 'Muscle relaxants', 'Physical therapy', 'Neck braces', 'Corticosteroids'],
    'Paralysis (brain hemorrhage)': ['Blood thinners', 'Clot-dissolving medications', 'Anticonvulsants', 'Physical therapy', 'Occupational therapy'],
    'Jaundice': ['IV fluids', 'Blood transfusions', 'Liver transplant', 'Medications for itching', 'Antiviral medications'],
    'Malaria': ['Antimalarial drugs', 'Antipyretics', 'Antiemetic drugs', 'IV fluids', 'Blood transfusions'],
    'Chicken pox': ['Antiviral drugs', 'Pain relievers', 'IV fluids', 'Blood transfusions', 'Platelet transfusions'],
    'Dengue': ['Antibiotics', 'Antipyretics', 'Analgesics', 'IV fluids', 'Corticosteroids'],
    'Typhoid': ['Vaccination', 'Antiviral drugs', 'IV fluids', 'Blood transfusions', 'Liver transplant'],
    'hepatitis A': ['Vaccination', 'Antiviral drugs', 'IV fluids', 'Blood transfusions', 'Liver transplant'],
    'Hepatitis B': ['Antiviral drugs', 'IV fluids', 'Blood transfusions', 'Platelet transfusions', 'Liver transplant'],
    'Hepatitis C': ['Antiviral drugs', 'IV fluids', 'Blood transfusions', 'Platelet transfusions', 'Liver transplant'],
    'Hepatitis D': ['Antiviral drugs', 'IV fluids', 'Blood transfusions', 'Platelet transfusions', 'Liver transplant'],
    'Hepatitis E': ['Alcohol cessation', 'Corticosteroids', 'IV fluids', 'Liver transplant', 'Nutritional support'],
    'Alcoholic hepatitis': ['Antibiotics', 'Isoniazid', 'Rifampin', 'Ethambutol', 'Pyrazinamide'],
    'Tuberculosis': ['Antipyretics', 'Decongestants', 'Cough suppressants', 'Antihistamines', 'Pain relievers'],
    'Common Cold': ['Antibiotics', 'Antiviral drugs', 'Antifungal drugs', 'IV fluids', 'Oxygen therapy'],
    'Pneumonia': ['Laxatives', 'Pain relievers', 'Warm baths', 'Cold compresses', 'High-fiber diet'],
    'Dimorphic hemmorhoids(piles)': ['Nitroglycerin', 'Aspirin', 'Beta-blockers', 'Calcium channel blockers', 'Thrombolytic drugs'],
    'Heart attack': ['Compression stockings', 'Exercise', 'Elevating the legs', 'Sclerotherapy', 'Laser treatments'],
    'Varicose veins': ['Levothyroxine', 'Antithyroid medications', 'Beta-blockers', 'Radioactive iodine', 'Thyroid surgery'],
    'Hypothyroidism': ['Antithyroid medications', 'Radioactive iodine', 'Thyroid surgery', 'Beta-blockers', 'Corticosteroids'],
    'Hyperthyroidism': ['Glucose tablets', 'Candy or juice', 'Glucagon injection', 'IV dextrose', 'Diazoxide'],
    'Hypoglycemia': ['Pain relievers', 'Exercise', 'Hot and cold packs', 'Joint protection', 'Physical therapy'],
    'Osteoarthristis': ['NSAIDs', 'Disease-modifying antirheumatic drugs (DMARDs)', 'Biologics', 'Corticosteroids', 'Joint replacement surgery'],
    'Arthritis': ['Vestibular rehabilitation', 'Canalith repositioning', 'Medications for nausea', 'Surgery', 'Home exercises'],
    '(vertigo) Paroymsal Positional Vertigo': ['Topical treatments', 'Antibiotics', 'Oral medications', 'Hormonal treatments', 'Isotretinoin'],
    'Acne': ['Antibiotics', 'Pain relievers', 'Antihistamines', 'Corticosteroids', 'Topical treatments'],
    'Urinary tract infection': ['Antibiotics', 'Urinary analgesics', 'Phenazopyridine', 'Antispasmodics', 'Probiotics'],
    'Psoriasis': ['Topical treatments', 'Phototherapy', 'Systemic medications', 'Biologics', 'Coal tar'],
    'Impetigo': ['Topical antibiotics', 'Oral antibiotics', 'Antiseptics', 'Ointments', 'Warm compresses']
};

const diets = {
    'Fungal infection': ['Antifungal Diet', 'Probiotics', 'Garlic', 'Coconut oil', 'Turmeric'],
    'Allergy': ['Elimination Diet', 'Omega-3-rich foods', 'Vitamin C-rich foods', 'Quercetin-rich foods', 'Probiotics'],
    'GERD': ['Low-Acid Diet', 'Fiber-rich foods', 'Ginger', 'Licorice', 'Aloe vera juice'],
    'Chronic cholestasis': ['Low-Fat Diet', 'High-Fiber Diet', 'Lean proteins', 'Whole grains', 'Fresh fruits and vegetables'],
    'Drug Reaction': ['Antihistamine Diet', 'Omega-3-rich foods', 'Vitamin C-rich foods', 'Quercetin-rich foods', 'Probiotics'],
    'Peptic ulcer diseae': ['Low-Acid Diet', 'Fiber-rich foods', 'Ginger', 'Licorice', 'Aloe vera juice'],
    'AIDS': ['Balanced Diet', 'Protein-rich foods', 'Fruits and vegetables', 'Whole grains', 'Healthy fats'],
    'Diabetes': ['Low-Glycemic Diet', 'Fiber-rich foods', 'Lean proteins', 'Healthy fats', 'Low-fat dairy'],
    'Gastroenteritis': ['Bland Diet', 'Bananas', 'Rice', 'Applesauce', 'Toast'],
    'Bronchial Asthma': ['Anti-Inflammatory Diet', 'Omega-3-rich foods', 'Fruits and vegetables', 'Whole grains', 'Lean proteins'],
    'Hypertension': ['DASH Diet', 'Low-sodium foods', 'Fruits and vegetables', 'Whole grains', 'Lean proteins'],
    'Migraine': ['Migraine Diet', 'Low-Tyramine Diet', 'Caffeine withdrawal', 'Hydration', 'Magnesium-rich foods'],
    'Cervical spondylosis': ['Arthritis Diet', 'Anti-Inflammatory Diet', 'Omega-3-rich foods', 'Fruits and vegetables', 'Whole grains'],
    'Paralysis (brain hemorrhage)': ['Heart-Healthy Diet', 'Low-sodium foods', 'Fruits and vegetables', 'Whole grains', 'Lean proteins'],
    'Jaundice': ['Liver-Healthy Diet', 'Low-fat Diet', 'Fruits and vegetables', 'Whole grains', 'Lean proteins'],
    'Malaria': ['Malaria Diet', 'Hydration', 'High-Calorie Diet', 'Soft and bland foods', 'Oral rehydration solutions'],
    'Chicken pox': ['Chicken Pox Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Dengue': ['Dengue Diet', 'Hydration', 'High-Calorie Diet', 'Soft and bland foods', 'Protein-rich foods'],
    'Typhoid': ['Typhoid Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'hepatitis A': ['Hepatitis A Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Hepatitis B': ['Hepatitis B Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Hepatitis C': ['Hepatitis C Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Hepatitis D': ['Hepatitis D Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Hepatitis E': ['Hepatitis E Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Alcoholic hepatitis': ['Liver-Healthy Diet', 'Low-fat Diet', 'Fruits and vegetables', 'Whole grains', 'Lean proteins'],
    'Tuberculosis': ['TB Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Common Cold': ['Cold Diet', 'Hydration', 'Warm fluids', 'Rest', 'Honey and lemon tea'],
    'Pneumonia': ['Pneumonia Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
    'Dimorphic hemmorhoids(piles)': ['Hemorrhoids Diet', 'High-Fiber Diet', 'Hydration', 'Warm baths', 'Stool softeners'],
    'Heart attack': ['Heart-Healthy Diet', 'Low-sodium foods', 'Fruits and vegetables', 'Whole grains', 'Lean proteins'],
    'Varicose veins': ['Varicose Veins Diet', 'High-Fiber Diet', 'Fruits and vegetables', 'Whole grains', 'Low-sodium foods'],
    'Hypothyroidism': ['Hypothyroidism Diet', 'Iodine-rich foods', 'Selenium-rich foods', 'Fruits and vegetables', 'Whole grains'],
    'Hyperthyroidism': ['Hyperthyroidism Diet', 'Low-Iodine Diet', 'Calcium-rich foods', 'Selenium-rich foods', 'Fruits and vegetables'],
    'Hypoglycemia': ['Hypoglycemia Diet', 'Complex carbohydrates', 'Protein-rich snacks', 'Fiber-rich foods', 'Healthy fats'],
    'Osteoarthristis': ['Arthritis Diet', 'Anti-Inflammatory Diet', 'Omega-3-rich foods', 'Fruits and vegetables', 'Whole grains'],
    'Arthritis': ['Arthritis Diet', 'Anti-Inflammatory Diet', 'Omega-3-rich foods', 'Fruits and vegetables', 'Whole grains'],
    '(vertigo) Paroymsal Positional Vertigo': ['Vertigo Diet', 'Low-Salt Diet', 'Hydration', 'Ginger tea', 'Vitamin D-rich foods'],
    'Acne': ['Acne Diet', 'Low-Glycemic Diet', 'Hydration', 'Fruits and vegetables', 'Probiotics'],
    'Urinary tract infection': ['UTI Diet', 'Hydration', 'Cranberry juice', 'Probiotics', 'Vitamin C-rich foods'],
    'Psoriasis': ['Psoriasis Diet', 'Anti-Inflammatory Diet', 'Omega-3-rich foods', 'Fruits and vegetables', 'Whole grains'],
    'Impetigo': ['Impetigo Diet', 'Antibiotic treatment', 'Fruits and vegetables', 'Hydration', 'Protein-rich foods']
};

const workout = {
    'Fungal infection': 'Light exercises like walking, avoid sweating in infected areas',
    'Allergy': 'Indoor exercises, swimming in indoor pools, yoga',
    'GERD': 'Low-impact exercises, walking, yoga, avoid exercises that put pressure on abdomen',
    'Malaria': 'Rest until recovery, then light activity as tolerated',
    'Common Cold': 'Rest during acute symptoms, light stretching when improving',
    'Chronic cholestasis': 'Light walking, gentle stretching, avoid strenuous activity',
    'Drug Reaction': 'Rest until symptoms resolve, then gradually return to activity as tolerated',
    'Peptic ulcer diseae': 'Low-impact activities, walking, swimming, avoid high-intensity exercises',
    'AIDS': 'Regular moderate exercise as tolerated, focus on strength training and cardiovascular health',
    'Diabetes': 'Regular aerobic exercise, strength training, monitor blood sugar before and after exercise',
    'Gastroenteritis': 'Rest and hydration during acute phase, gentle walking when recovering',
    'Bronchial Asthma': 'Swimming, walking, yoga with focused breathing, avoid cold-weather exercise',
    'Hypertension': 'Regular aerobic exercise, moderate intensity training, avoid heavy weightlifting',
    'Migraine': 'Regular moderate exercise, avoid exercise during migraine attacks, yoga and tai chi',
    'Cervical spondylosis': 'Neck-specific exercises, gentle stretching, swimming, avoid high-impact activities',
    'Paralysis (brain hemorrhage)': 'Physical therapy-guided exercises, adaptive activities based on ability',
    'Jaundice': 'Rest during acute phase, gentle walking when recovering',
    'Chicken pox': 'Rest until lesions heal and fever subsides, then light activity',
    'Dengue': 'Complete rest during acute phase, gradual return to activity during recovery',
    'Typhoid': 'Rest during fever, gradual return to activity during recovery phase',
    'hepatitis A': 'Rest during acute phase, light walking during recovery',
    'Hepatitis B': 'Light to moderate exercise as tolerated, avoid exhaustion',
    'Hepatitis C': 'Moderate exercise as tolerated, focus on maintaining muscle mass',
    'Hepatitis D': 'Light exercise as tolerated, prioritize rest during symptomatic periods',
    'Alcoholic hepatitis': 'Light walking, gentle activities after acute phase has resolved',
    'Tuberculosis': 'Rest during active infection, gradual return to activity during recovery',
    'Pneumonia': 'Complete rest during acute phase, gradual return to activity as breathing improves',
    'Dimorphic hemmorhoids(piles)': 'Walking, swimming, avoid sitting for long periods, avoid heavy lifting',
    'Heart attack': 'Cardiac rehabilitation program, medically supervised exercise program',
    'Varicose veins': 'Walking, swimming, leg-strengthening exercises, avoid standing for long periods',
    'Hypothyroidism': 'Regular aerobic exercise, strength training, start with low intensity',
    'Hyperthyroidism': 'Low-impact activities, yoga, avoid high-intensity workouts until controlled',
    'Hypoglycemia': 'Regular moderate exercise, ensure proper food intake before exercise',
    'Osteoarthristis': 'Low-impact activities, swimming, water aerobics, gentle strength training',
    'Arthritis': 'Range-of-motion exercises, water exercises, modified strength training',
    '(vertigo) Paroymsal Positional Vertigo': 'Balance exercises under supervision, avoid sudden head movements',
    'Acne': 'Regular exercise, shower immediately after sweating, avoid touching face during workout',
    'Urinary tract infection': 'Light walking, gentle stretching, avoid high-impact activities until resolved',
    'Psoriasis': 'Swimming (especially in salt water), moderate exercise, shower immediately after',
    'Impetigo': 'Rest until lesions heal, avoid activities that could spread infection'
};

const targetedQuestions = [
    {
        id: "question_general_1",
        question: "How would you describe your overall energy level?",
        options: [
            { id: "energy_normal", text: "Normal - I have my usual level of energy", symptoms: [] },
            { id: "energy_low", text: "Low - I feel more tired than usual", symptoms: ["fatigue"] },
            { id: "energy_very_low", text: "Very low - I'm exhausted even with minimal activity", symptoms: ["fatigue", "muscle_weakness"] }
        ]
    },
    {
        id: "question_general_2",
        question: "Have you noticed any changes in your body temperature recently?",
        options: [
            { id: "temp_normal", text: "No, my temperature feels normal", symptoms: [] },
            { id: "temp_cold", text: "I feel unusually cold", symptoms: ["chills"] },
            { id: "temp_hot", text: "I feel unusually hot or have had a fever", symptoms: ["high_fever"] }
        ]
    },
    {
        id: "question_general_3",
        question: "Have you noticed any weight changes over the past month?",
        options: [
            { id: "weight_stable", text: "My weight has been stable", symptoms: [] },
            { id: "weight_loss", text: "I've lost weight without trying", symptoms: ["weight_loss"] },
            { id: "weight_gain", text: "I've gained weight without changing my diet/exercise", symptoms: ["weight_gain"] }
        ]
    },
    {
        id: "question_head_1",
        question: "Have you been experiencing headaches?",
        options: [
            { id: "headache_none", text: "No headaches", symptoms: [] },
            { id: "headache_mild", text: "Mild or occasional headaches", symptoms: ["headache"] },
            { id: "headache_severe", text: "Severe or persistent headaches", symptoms: ["headache", "high_fever"] }
        ]
    },
    {
        id: "question_head_2",
        question: "Have you noticed any issues with your eyes?",
        options: [
            { id: "eyes_normal", text: "No, my eyes feel normal", symptoms: [] },
            { id: "eyes_watery", text: "My eyes are watery or tearing up", symptoms: ["watering_from_eyes"] },
            { id: "eyes_red", text: "My eyes are red or irritated", symptoms: ["redness_of_eyes"] },
            { id: "eyes_both", text: "Both watery and red/irritated", symptoms: ["watering_from_eyes", "redness_of_eyes"] }
        ]
    },
    {
        id: "question_respiratory_1",
        question: "Have you been coughing?",
        options: [
            { id: "cough_none", text: "No coughing", symptoms: [] },
            { id: "cough_mild", text: "Occasional dry cough", symptoms: ["cough"] },
            { id: "cough_severe", text: "Frequent coughing or coughing up phlegm", symptoms: ["cough", "throat_irritation"] }
        ]
    },
    {
        id: "question_respiratory_2",
        question: "Are you experiencing any sneezing or nasal congestion?",
        options: [
            { id: "sneeze_none", text: "No sneezing or congestion", symptoms: [] },
            { id: "sneeze_mild", text: "Occasional sneezing", symptoms: [] },
            { id: "sneeze_frequent", text: "Frequent or continuous sneezing", symptoms: ["continuous_sneezing"] }
        ]
    },
    {
        id: "question_digestive_1",
        question: "Have you experienced any stomach or digestive issues?",
        options: [
            { id: "digestive_none", text: "No digestive issues", symptoms: [] },
            { id: "digestive_pain", text: "Stomach pain", symptoms: ["stomach_pain"] },
            { id: "digestive_acid", text: "Acid reflux or heartburn", symptoms: ["acidity"] },
            { id: "digestive_nausea", text: "Nausea or vomiting", symptoms: ["vomiting", "nausea"] },
            { id: "digestive_diarrhea", text: "Diarrhea", symptoms: ["diarrhoea"] }
        ]
    },
    {
        id: "question_skin_1",
        question: "Have you noticed any skin changes or issues?",
        options: [
            { id: "skin_normal", text: "No skin issues", symptoms: [] },
            { id: "skin_itchy", text: "Itchy skin", symptoms: ["itching"] },
            { id: "skin_rash", text: "Skin rash or redness", symptoms: ["skin_rash"] },
            { id: "skin_bumps", text: "Raised bumps or nodules on skin", symptoms: ["nodal_skin_eruptions"] },
            { id: "skin_multiple", text: "Multiple skin issues", symptoms: ["itching", "skin_rash"] }
        ]
    },
    {
        id: "question_musculoskeletal_1",
        question: "Are you experiencing any pain or discomfort in your joints or muscles?",
        options: [
            { id: "joint_none", text: "No joint or muscle issues", symptoms: [] },
            { id: "joint_pain", text: "Joint pain", symptoms: ["joint_pain"] },
            { id: "joint_stiff", text: "Stiffness when moving", symptoms: ["movement_stiffness"] },
            { id: "joint_swelling", text: "Swollen joints", symptoms: ["swelling_joints"] },
            { id: "muscle_weak", text: "Muscle weakness", symptoms: ["muscle_weakness"] }
        ]
    },
    {
        id: "question_cardiovascular_1",
        question: "Have you experienced any issues related to your heart or breathing?",
        options: [
            { id: "heart_none", text: "No heart or breathing issues", symptoms: [] },
            { id: "heart_pain", text: "Chest pain", symptoms: ["chest_pain"] },
            { id: "heart_palpitations", text: "Irregular heartbeat or palpitations", symptoms: ["palpitations"] },
            { id: "heart_breath", text: "Shortness of breath", symptoms: ["breathlessness"] }
        ]
    },
    {
        id: "question_neurological_1",
        question: "Have you experienced any neurological symptoms?",
        options: [
            { id: "neuro_none", text: "No neurological issues", symptoms: [] },
            { id: "neuro_dizzy", text: "Dizziness", symptoms: ["dizziness"] },
            { id: "neuro_balance", text: "Loss of balance or coordination", symptoms: ["loss_of_balance"] },
            { id: "neuro_stiffneck", text: "Stiff neck", symptoms: ["stiff_neck"] }
        ]
    },
    {
        id: "question_psychological_1",
        question: "Have you noticed any changes in your mood or mental state?",
        options: [
            { id: "mood_normal", text: "No mood changes", symptoms: [] },
            { id: "mood_anxiety", text: "Feeling anxious or on edge", symptoms: ["anxiety"] },
            { id: "mood_swings", text: "Experiencing mood swings", symptoms: ["mood_swings"] },
            { id: "mood_restless", text: "Feeling restless or unable to relax", symptoms: ["restlessness"] }
        ]
    }
];

// Global variables
let symptomCombinations = [];
let selectedSymptoms = [];
let surveyMode = false;

// Function to load and parse CSV data
function loadSymptomCombinations() {
    fetch('./datasets/symtoms_df.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row.trim() === '') continue;
                
                const columns = row.split(',');
                const disease = columns[1];
                const symptoms = [
                    columns[2].trim(), 
                    columns[3].trim(), 
                    columns[4].trim(), 
                    columns[5] ? columns[5].trim() : ''
                ].filter(s => s !== '');
                
                symptomCombinations.push([disease, symptoms]);
            }
            console.log(`Loaded ${symptomCombinations.length} symptom combinations`);
        })
        .catch(error => {
            console.error('Error loading symptom combinations:', error);
        });
}

// Find exact match from loaded CSV data
function findExactDiseaseMatch(symptoms) {
    const sortedUserSymptoms = [...symptoms].sort();
    for (const [disease, symptomSet] of symptomCombinations) {
        const sortedSymptomSet = [...symptomSet].sort();
        if (JSON.stringify(sortedUserSymptoms) === JSON.stringify(sortedSymptomSet)) {
            return disease;
        }
    }
    return null;
}

// Function to run the targeted survey
function runTargetedSurvey() {
    let currentQuestionIndex = 0;
    let collectedSymptoms = [...selectedSymptoms];
    const surveyContainer = document.getElementById('survey-container');
    
    function displayQuestion() {
        if (currentQuestionIndex >= targetedQuestions.length) {
            finishTargetedSurvey();
            return;
        }
        
        const currentQuestion = targetedQuestions[currentQuestionIndex];
        
        let questionHTML = `
            <div class="survey-question mb-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Question ${currentQuestionIndex + 1} of ${targetedQuestions.length}</h3>
                <p class="mb-4 text-gray-800">${currentQuestion.question}</p>
                <div class="space-y-3">
        `;
        
        currentQuestion.options.forEach(option => {
            questionHTML += `
                <div class="flex items-center">
                    <input id="${option.id}" name="question_${currentQuestion.id}" type="radio" 
                           class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                           data-symptoms="${option.symptoms.join(',')}">
                    <label for="${option.id}" class="ml-3 block text-sm font-medium text-gray-700">
                        ${option.text}
                    </label>
                </div>
            `;
        });
        
        questionHTML += `
                </div>
                <div class="flex justify-between mt-6">
                    ${currentQuestionIndex > 0 ? 
                      '<button type="button" id="prev-question" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Previous</button>' : 
                      '<div></div>'}
                    <button type="button" id="next-question" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        ${currentQuestionIndex === targetedQuestions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        `;
        
        const progressPercent = ((currentQuestionIndex + 1) / targetedQuestions.length) * 100;
        questionHTML = `
            <div class="mb-4">
                <div class="relative pt-1">
                    <div class="flex mb-2 items-center justify-between">
                        <div>
                            <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Progress
                            </span>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-semibold inline-block text-indigo-600">
                                ${Math.round(progressPercent)}%
                            </span>
                        </div>
                    </div>
                    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div style="width:${progressPercent}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                    </div>
                </div>
            </div>
        ` + questionHTML;
        
        surveyContainer.innerHTML = questionHTML;
        
        document.getElementById('next-question').addEventListener('click', () => {
            const selectedOption = document.querySelector(`input[name="question_${currentQuestion.id}"]:checked`);
            if (!selectedOption) {
                const existingAlert = document.querySelector('.alert-message');
                if (!existingAlert) {
                    const alertMsg = document.createElement('div');
                    alertMsg.className = 'alert-message bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4';
                    alertMsg.innerHTML = '<p>Please select an option to continue.</p>';
                    document.getElementById('next-question').parentNode.before(alertMsg);
                }
                return;
            }
            
            const selectedSymptoms = selectedOption.dataset.symptoms;
            if (selectedSymptoms) {
                selectedSymptoms.split(',').forEach(symptom => {
                    if (symptom && !collectedSymptoms.includes(symptom)) {
                        collectedSymptoms.push(symptom);
                    }
                });
            }
            
            currentQuestionIndex++;
            displayQuestion();
        });
        
        if (currentQuestionIndex > 0) {
            document.getElementById('prev-question').addEventListener('click', () => {
                currentQuestionIndex--;
                displayQuestion();
            });
        }
    }
    
    function finishTargetedSurvey() {
        let summaryHTML = `
            <div class="survey-summary mb-6">
                <h3 class="text-xl font-medium text-gray-900 mb-4">Symptom Analysis Complete</h3>
                
                ${collectedSymptoms.length > 0 ? 
                    `<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-green-700">
                                    Based on your responses, we've identified ${collectedSymptoms.length} potential symptoms.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                        <ul class="divide-y divide-gray-200">
                            ${collectedSymptoms.map(symptom => 
                                `<li class="px-4 py-4 sm:px-6">
                                    <div class="flex items-center">
                                        <div class="min-w-0 flex-1">
                                            <p class="text-sm font-medium text-indigo-600 truncate">
                                                ${symptom.replace(/_/g, ' ')}
                                            </p>
                                        </div>
                                    </div>
                                </li>`
                            ).join('')}
                        </ul>
                    </div>` : 
                    `<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-yellow-700">
                                    No specific symptoms were identified from your responses. You might be healthy or experiencing symptoms not covered in our questionnaire.
                                </p>
                            </div>
                        </div>
                    </div>`
                }
                
                <div class="mt-6">
                    <p class="text-sm text-gray-500 mb-4">What would you like to do next?</p>
                    <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button type="button" id="predict-from-targeted" class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Get Disease Prediction
                        </button>
                        <button type="button" id="restart-targeted-survey" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Start Over
                        </button>
                        <button type="button" id="switch-to-manual" class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Manual Entry
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        surveyContainer.innerHTML = summaryHTML;
        
        document.getElementById('predict-from-targeted').addEventListener('click', () => {
            processCollectedSymptoms(collectedSymptoms);
        });
        
        document.getElementById('restart-targeted-survey').addEventListener('click', () => {
            currentQuestionIndex = 0;
            collectedSymptoms = [];
            displayQuestion();
        });
        
        document.getElementById('switch-to-manual').addEventListener('click', () => {
            switchToManualMode(collectedSymptoms);
        });
    }
    
    displayQuestion();
}

// Function to process collected symptoms and predict disease
function processCollectedSymptoms(symptoms) {
    selectedSymptoms = [...new Set(symptoms)];
    updateSelectedSymptoms();
    updateSymptomsInput();
    predictDisease();
}

// Function to switch to manual mode
function switchToManualMode(symptoms) {
    surveyMode = false;
    document.getElementById('survey-container').classList.add('hidden');
    document.getElementById('prediction-form').classList.remove('hidden');
    
    selectedSymptoms = [...new Set(symptoms)];
    updateSelectedSymptoms();
    updateSymptomsInput();
    
    const toggleButton = document.querySelector('[data-toggle="survey-mode"]');
    toggleButton.textContent = 'Switch to Survey Mode';
    toggleButton.className = 'px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500';
}

// Function to display prediction results
function displayResults(predictionData) {
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');
    
    let resultHTML = `
        <div class="space-y-4">
            <div>
                <h3 class="text-lg font-medium text-gray-900">Predicted Disease</h3>
                <p class="mt-1 text-sm text-gray-600">${predictionData.predictedDisease}</p>
            </div>
            <div>
                <h3 class="text-lg font-medium text-gray-900">Symptoms</h3>
                <p class="mt-1 text-sm text-gray-600">${predictionData.symptoms.join(', ')}</p>
            </div>
            <div>
                <h3 class="text-lg font-medium text-gray-900">Description</h3>
                <p class="mt-1 text-sm text-gray-600">${predictionData.description}</p>
            </div>
            <div>
                <h3 class="text-lg font-medium text-gray-900">Precautions</h3>
                <ul class="mt-1 text-sm text-gray-600 list-disc pl-5">
                    ${predictionData.precautions.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-medium text-gray-900">Medications</h3>
                <ul class="mt-1 text-sm text-gray-600 list-disc pl-5">
                    ${predictionData.medications.map(m => `<li>${m}</li>`).join('')}
                </ul>
                <p class="mt-2 text-xs text-red-600">Consult a healthcare professional before taking any medications.</p>
            </div>
            <div>
                <h3 class="text-lg font-medium text-gray-900">Diet</h3>
                <ul class="mt-1 text-sm text-gray-600 list-disc pl-5">
                    ${predictionData.diet.map(d => `<li>${d}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-medium text-gray-900">Workout Recommendations</h3>
                <p class="mt-1 text-sm text-gray-600">${predictionData.workout}</p>
            </div>
            <div class="mt-4">
                <button type="button" id="clear-results" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Clear Results
                </button>
            </div>
        </div>
    `;
    
    resultContent.innerHTML = resultHTML;
    resultContainer.classList.remove('hidden');
    
    document.getElementById('clear-results').addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        resultContent.innerHTML = '';
        selectedSymptoms = [];
        updateSelectedSymptoms();
        updateSymptomsInput();
        updateCheckboxes();
    });
}

// Initialize survey page
function initializeSurveyPage() {
    console.log('Initializing survey page');
    
    loadSymptomCombinations();
    
    const availableSymptomsContainer = document.getElementById('available-symptoms');
    const symptomCheckboxesContainer = document.getElementById('symptom-checkboxes');
    const symptomsInput = document.getElementById('symptoms');
    const selectedSymptomsContainer = document.getElementById('selected-symptoms');
    const selectedSymptomsDiv = document.getElementById('selected-symptoms-container');
    const form = document.getElementById('prediction-form');
    const messageContainer = document.getElementById('message-container');
    const message = document.getElementById('message');
    const predictButton = document.getElementById('predict-button');
    const toggleButton = document.querySelector('[data-toggle="survey-mode"]');
    const resultContainer = document.getElementById('result-container');

    const requiredElements = {
        availableSymptomsContainer, symptomCheckboxesContainer, symptomsInput, selectedSymptomsContainer,
        selectedSymptomsDiv, form, messageContainer, message, predictButton, toggleButton, resultContainer
    };
    const missingElements = Object.entries(requiredElements).filter(([k, v]) => !v).map(([k]) => k);
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements);
        document.body.innerHTML = `
            <div class="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-6">Error</h1>
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            Missing elements: ${missingElements.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    loadAvailableSymptoms();
    loadSymptomCheckboxes();
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        predictDisease();
    });

    toggleButton.addEventListener('click', () => {
        surveyMode = !surveyMode;
        if (surveyMode) {
            document.getElementById('prediction-form').classList.add('hidden');
            document.getElementById('result-container').classList.add('hidden');
            document.getElementById('survey-container').classList.remove('hidden');
            toggleButton.textContent = 'Switch to Manual Mode';
            toggleButton.className = 'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
            runTargetedSurvey();
        } else {
            document.getElementById('survey-container').classList.add('hidden');
            document.getElementById('prediction-form').classList.remove('hidden');
            toggleButton.textContent = 'Switch to Survey Mode';
            toggleButton.className = 'px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500';
        }
    });

    function loadAvailableSymptoms() {
        const symptoms = Object.keys(symptomsDict).sort();
        symptoms.forEach(symptom => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'symptom-tag bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded';
            button.textContent = symptom.replace(/_/g, ' ');
            button.addEventListener('click', function() {
                addSymptom(symptom);
            });
            availableSymptomsContainer.appendChild(button);
        });
    }

    function loadSymptomCheckboxes() {
        const symptoms = Object.keys(symptomsDict).sort();
        symptoms.forEach(symptom => {
            const div = document.createElement('div');
            div.className = 'flex items-center';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${symptom}`;
            checkbox.className = 'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    addSymptom(symptom);
                } else {
                    removeSymptom(symptom);
                }
            });
            const label = document.createElement('label');
            label.htmlFor = `checkbox-${symptom}`;
            label.className = 'ml-2 text-sm text-gray-700';
            label.textContent = symptom.replace(/_/g, ' ');
            div.appendChild(checkbox);
            div.appendChild(label);
            symptomCheckboxesContainer.appendChild(div);
        });
    }

    function addSymptom(symptom) {
        if (!selectedSymptoms.includes(symptom)) {
            selectedSymptoms.push(symptom);
            updateSelectedSymptoms();
            updateSymptomsInput();
            updateCheckboxes();
        }
    }

    function removeSymptom(symptom) {
        selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
        updateSelectedSymptoms();
        updateSymptomsInput();
        updateCheckboxes();
    }

    function updateSelectedSymptoms() {
        selectedSymptomsContainer.innerHTML = '';
        if (selectedSymptoms.length > 0) {
            selectedSymptomsDiv.classList.remove('hidden');
            selectedSymptoms.forEach(symptom => {
                const span = document.createElement('span');
                span.className = 'symptom-tag bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded flex items-center';
                const text = document.createTextNode(symptom.replace(/_/g, ' '));
                span.appendChild(text);
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'ml-1 text-indigo-600 hover:text-indigo-900';
                button.textContent = '×';
                button.addEventListener('click', function() {
                    removeSymptom(symptom);
                });
                span.appendChild(button);
                selectedSymptomsContainer.appendChild(span);
            });
        } else {
            selectedSymptomsDiv.classList.add('hidden');
        }
    }

    function updateSymptomsInput() {
        symptomsInput.value = selectedSymptoms.join(', ');
    }

    function updateCheckboxes() {
        const checkboxes = document.querySelectorAll('#symptom-checkboxes input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const symptom = checkbox.id.replace('checkbox-', '');
            checkbox.checked = selectedSymptoms.includes(symptom);
        });
    }

    function predictDisease() {
        messageContainer.classList.add('hidden');
        const symptoms = symptomsInput.value.trim();
        if (!symptoms || symptoms === "Symptoms") {
            showMessage("Please enter at least one symptom");
            return;
        }
        const userSymptoms = symptoms.split(',').map(s => s.trim()).filter(s => s);
        const validSymptoms = userSymptoms.filter(symptom => symptom in symptomsDict);
        if (validSymptoms.length === 0) {
            showMessage("No valid symptoms provided. Please check your input.");
            return;
        }
        predictButton.textContent = "Processing...";
        predictButton.disabled = true;
        setTimeout(() => {
            const exactMatch = findExactDiseaseMatch(validSymptoms);
            const predictedDisease = exactMatch || getPredictedDisease(validSymptoms);
            
            const predictionData = {
                predictedDisease,
                symptoms: validSymptoms,
                description: description[predictedDisease] || "No detailed description available.",
                precautions: precautions[predictedDisease] || ["No specific precautions available."],
                medications: medications[predictedDisease] || ["Consult a doctor for appropriate medications."],
                diet: diets[predictedDisease] || ["No specific diet recommendations available."],
                workout: workout[predictedDisease] || "No specific workout recommendations available."
            };
            localStorage.setItem('latestPrediction', JSON.stringify(predictionData));
            const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
            history.push({ ...predictionData, timestamp: new Date().toISOString() });
            localStorage.setItem('predictionHistory', JSON.stringify(history));
            predictButton.textContent = "Predict Disease";
            predictButton.disabled = false;
            displayResults(predictionData);
        }, 1000);
    }

    function getPredictedDisease(symptoms) {
        const inputVector = new Array(Object.keys(symptomsDict).length).fill(0);
        symptoms.forEach(symptom => {
            if (symptom in symptomsDict) {
                inputVector[symptomsDict[symptom]] = 1;
            }
        });
        let maxScore = -1;
        let predictedDiseaseId = 15;
        Object.entries(diseasesList).forEach(([diseaseId, diseaseName]) => {
            let score = 0;
            switch (parseInt(diseaseId)) {
                case 15:
                    if (inputVector[symptomsDict['itching']] === 1) score += 3;
                    if (inputVector[symptomsDict['skin_rash']] === 1) score += 2;
                    if (inputVector[symptomsDict['nodal_skin_eruptions']] === 1) score += 2;
                    break;
                case 4:
                    if (inputVector[symptomsDict['continuous_sneezing']] === 1) score += 3;
                    if (inputVector[symptomsDict['watering_from_eyes']] === 1) score += 2;
                    if (inputVector[symptomsDict['redness_of_eyes']] === 1) score += 2;
                    break;
                case 16:
                    if (inputVector[symptomsDict['stomach_pain']] === 1) score += 3;
                    if (inputVector[symptomsDict['acidity']] === 1) score += 3;
                    if (inputVector[symptomsDict['vomiting']] === 1) score += 1;
                    break;
                case 10:
                    if (inputVector[symptomsDict['continuous_sneezing']] === 1) score += 2;
                    if (inputVector[symptomsDict['cough']] === 1) score += 2;
                    if (inputVector[symptomsDict['headache']] === 1) score += 1;
                    if (inputVector[symptomsDict['throat_irritation']] === 1) score += 2;
                    break;
                default:
                    score = inputVector.reduce((sum, val) => sum + val, 0) % 3;
            }
            if (score > maxScore) {
                maxScore = score;
                predictedDiseaseId = parseInt(diseaseId);
            }
        });
        return diseasesList[predictedDiseaseId];
    }

    function showMessage(msg) {
        messageContainer.classList.remove('hidden');
        message.textContent = msg;
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 3000);
    }
    }   