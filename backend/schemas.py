
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, datetime

class DoctorBase(BaseModel):
    name: str
    specialty: Optional[str]
    phone: Optional[str]
    email: Optional[EmailStr]

class DoctorCreate(DoctorBase):
    pass

class Doctor(DoctorBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class RoomBase(BaseModel):
    room_number: str
    type: Optional[str]
    floor: Optional[int]
    status: Optional[str] = "available"

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: int

    class Config:
        orm_mode = True

class PatientBase(BaseModel):
    name: str
    date_of_birth: Optional[date]
    gender: Optional[str]
    doctor_id: Optional[int]
    room_id: Optional[int]
    medical_history: Optional[str]
    admission_date: Optional[date]

class PatientCreate(PatientBase):
    pass

class Patient(PatientBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class VisitBase(BaseModel):
    patient_id: int
    doctor_id: int
    visit_date: datetime
    reason: Optional[str]
    diagnosis: Optional[str]
    notes: Optional[str]

class VisitCreate(VisitBase):
    pass

class Visit(VisitBase):
    id: int

    class Config:
        orm_mode = True

class MedicationBase(BaseModel):
    patient_id: int
    name: str
    dosage: Optional[str]
    frequency: Optional[str]
    start_date: Optional[date]
    end_date: Optional[date]
    prescribed_by: Optional[int]

class MedicationCreate(MedicationBase):
    pass

class Medication(MedicationBase):
    id: int

    class Config:
        orm_mode = True
