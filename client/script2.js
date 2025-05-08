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
    'Peptic ulcer disease': 'Peptic ulcer disease involves sores that develop on the inner lining of the stomach and small intestine.',
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
    'Hepatitis A': 'Hepatitis A is a viral liver disease.',
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
    'Paroxysmal Positional Vertigo': 'Paroxysmal Positional Vertigo is a type of dizziness caused by specific head movements.',
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
    'Hepatitis A': ['Consult nearest hospital', 'Wash hands thoroughly', 'Avoid fatty spicy food', 'Medication'],
    'Osteoarthristis': ['Acetaminophen', 'Consult nearest hospital', 'Follow up', 'Salt baths'],
    'Paroxysmal Positional Vertigo': ['Lie down', 'Avoid sudden change in body', 'Avoid abrupt head movement', 'Relax'],
    'Hypoglycemia': ['Lie down on side', 'Check pulse', 'Drink sugary drinks', 'Consult doctor'],
    'Acne': ['Bath twice', 'Avoid fatty spicy food', 'Drink plenty of water', 'Avoid too many products'],
    'Diabetes': ['Have balanced diet', 'Exercise', 'Consult doctor', 'Follow up'],
    'Impetigo': ['Soak affected area in warm water', 'Use antibiotics', 'Remove scabs with wet compressed cloth', 'Consult doctor'],
    'Hypertension': ['Meditation', 'Salt baths', 'Reduce stress', 'Get proper sleep'],
    'Peptic ulcer disease': ['Avoid fatty spicy food', 'Consume probiotic food', 'Eliminate milk', 'Limit alcohol'],
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
    'Peptic ulcer disease': ['Antibiotics', 'Proton Pump Inhibitors (PPIs)', 'H2 Blockers', 'Antacids', 'Cytoprotective agents'],
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
    'Hepatitis A': ['Vaccination', 'Antiviral drugs', 'IV fluids', 'Blood transfusions', 'Liver transplant'],
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
    'Paroxysmal Positional Vertigo': ['Topical treatments', 'Antibiotics', 'Oral medications', 'Hormonal treatments', 'Isotretinoin'],
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
    'Peptic ulcer disease': ['Low-Acid Diet', 'Fiber-rich foods', 'Ginger', 'Licorice', 'Aloe vera juice'],
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
    'Hepatitis A': ['Hepatitis A Diet', 'High-Calorie Diet', 'Soft and bland foods', 'Hydration', 'Protein-rich foods'],
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
    'Paroxysmal Positional Vertigo': ['Vertigo Diet', 'Low-Salt Diet', 'Hydration', 'Ginger tea', 'Vitamin D-rich foods'],
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
    'Chronic Cholestasis': 'Light walking, gentle stretching, avoid strenuous activity',
    'Drug Reaction': 'Rest until symptoms resolve, then gradually return to activity as tolerated',
    'Peptic Ulcer Disease': 'Low-impact activities, walking, swimming, avoid high-intensity exercises',
    'AIDS': 'Regular moderate exercise as tolerated, focus on strength training and cardiovascular health',
    'Diabetes': 'Regular aerobic exercise, strength training, monitor blood sugar before and after exercise',
    'Gastroenteritis': 'Rest and hydration during acute phase, gentle walking when recovering',
    'Bronchial Asthma': 'Swimming, walking, yoga with focused breathing, avoid cold-weather exercise',
    'Hypertension': 'Regular aerobic exercise, moderate intensity training, avoid heavy weightlifting',
    'Migraine': 'Regular moderate exercise, avoid exercise during migraine attacks, yoga and tai chi',
    'Cervical Spondylosis': 'Neck-specific exercises, gentle stretching, swimming, avoid high-impact activities',
    'Paralysis (Brain Hemorrhage)': 'Physical therapy-guided exercises, adaptive activities based on ability',
    'Jaundice': 'Rest during acute phase, gentle walking when recovering',
    'Malaria': 'Rest until recovery, then light activity as tolerated',
    'Chicken Pox': 'Rest until lesions heal and fever subsides, then light activity',
    'Dengue': 'Complete rest during acute phase, gradual return to activity during recovery',
    'Typhoid': 'Rest during fever, gradual return to activity during recovery phase',
    'Hepatitis A': 'Rest during acute phase, light walking during recovery',
    'Hepatitis B': 'Light to moderate exercise as tolerated, avoid exhaustion',
    'Hepatitis C': 'Moderate exercise as tolerated, focus on maintaining muscle mass',
    'Hepatitis D': 'Light exercise as tolerated, prioritize rest during symptomatic periods',
    'Alcoholic Hepatitis': 'Light walking, gentle activities after acute phase has resolved',
    'Tuberculosis': 'Rest during active infection, gradual return to activity during recovery',
    'Pneumonia': 'Complete rest during acute phase, gradual return to activity as breathing improves',
    'Dimorphic Hemorrhoids (Piles)': 'Walking, swimming, avoid sitting for long periods, avoid heavy lifting',
    'Heart Attack': 'Cardiac rehabilitation program, medically supervised exercise program',
    'Varicose Veins': 'Walking, swimming, leg-strengthening exercises, avoid standing for long periods',
    'Hypothyroidism': 'Regular aerobic exercise, strength training, start with low intensity',
    'Hyperthyroidism': 'Low-impact activities, yoga, avoid high-intensity workouts until controlled',
    'Hypoglycemia': 'Regular moderate exercise, ensure proper food intake before exercise',
    'Osteoarthritis': 'Low-impact activities, swimming, water aerobics, gentle strength training',
    'Arthritis': 'Range-of-motion exercises, water exercises, modified strength training',
    'Paroxysmal Positional Vertigo': 'Balance exercises under supervision, avoid sudden head movements',
    'Acne': 'Regular exercise, shower immediately after sweating, avoid touching face during workout',
    'Urinary Tract Infection': 'Light walking, gentle stretching, avoid high-impact activities until resolved',
    'Psoriasis': 'Swimming (especially in salt water), moderate exercise, shower immediately after',
    'Impetigo': 'Rest until lesions heal, avoid activities that could spread infection'
};

let selectedSymptoms = [];

function initializeSurveyPage() {
    console.log('Initializing survey page');
    const availableSymptomsContainer = document.getElementById('available-symptoms');
    const symptomsInput = document.getElementById('symptoms');
    const selectedSymptomsContainer = document.getElementById('selected-symptoms');
    const selectedSymptomsDiv = document.getElementById('selected-symptoms-container');
    const form = document.getElementById('prediction-form');
    const messageContainer = document.getElementById('message-container');
    const message = document.getElementById('message');
    const predictButton = document.getElementById('predict-button');

    const requiredElements = {
        availableSymptomsContainer, symptomsInput, selectedSymptomsContainer,
        selectedSymptomsDiv, form, messageContainer, message, predictButton
    };
    const missingElements = Object.entries(requiredElements).filter(([k, v]) => !v).map(([k]) => k);
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements);
        document.querySelector('.main-content').innerHTML = `
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
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        predictDisease();
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

    function addSymptom(symptom) {
        if (!selectedSymptoms.includes(symptom)) {
            selectedSymptoms.push(symptom);
            updateSelectedSymptoms();
            updateSymptomsInput();
        }
    }

    function removeSymptom(symptom) {
        selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
        updateSelectedSymptoms();
        updateSymptomsInput();
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
            const predictedDisease = getPredictedDisease(validSymptoms);
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
            window.location.href = 'dashboard.html?page=results';
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
        message.textContent = msg;
        messageContainer.classList.remove('hidden');
    }

    symptomsInput.addEventListener('change', function() {
        const inputSymptoms = symptomsInput.value.split(',').map(s => s.trim()).filter(s => s);
        selectedSymptoms = [];
        inputSymptoms.forEach(symptomText => {
            const matchedSymptom = Object.keys(symptomsDict).find(s =>
                s === symptomText || s.replace(/_/g, ' ') === symptomText
            );
            if (matchedSymptom) {
                selectedSymptoms.push(matchedSymptom);
            }
        });
        updateSelectedSymptoms();
    });
}

window.initializeSurveyPage = initializeSurveyPage;
console.log('script2.js loaded');