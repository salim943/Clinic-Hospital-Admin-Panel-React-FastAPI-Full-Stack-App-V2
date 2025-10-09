
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Text, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialty = Column(String(100))
    phone = Column(String(20))
    email = Column(String(100))
    created_at = Column(TIMESTAMP, server_default=func.now())
    patients = relationship("Patient", back_populates="doctor")
    medications_prescribed = relationship("Medication", back_populates="prescribed_by_doctor")
    visits = relationship("Visit", back_populates="doctor")

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    room_number = Column(String(10), unique=True, nullable=False)
    type = Column(String(50))
    floor = Column(Integer)
    status = Column(String(20), default='available')
    patients = relationship("Patient", back_populates="room")

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    date_of_birth = Column(Date)
    gender = Column(String(10))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    medical_history = Column(Text)
    admission_date = Column(Date)
    created_at = Column(TIMESTAMP, server_default=func.now())
    doctor = relationship("Doctor", back_populates="patients")
    room = relationship("Room", back_populates="patients")
    visits = relationship("Visit", back_populates="patient")
    medications = relationship("Medication", back_populates="patient")

class Visit(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    visit_date = Column(TIMESTAMP, nullable=False)
    reason = Column(Text)
    diagnosis = Column(Text)
    notes = Column(Text)
    patient = relationship("Patient", back_populates="visits")
    doctor = relationship("Doctor", back_populates="visits")

class Medication(Base):
    __tablename__ = "medications"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    name = Column(String(100), nullable=False)
    dosage = Column(String(50))
    frequency = Column(String(50))
    start_date = Column(Date)
    end_date = Column(Date)
    prescribed_by = Column(Integer, ForeignKey("doctors.id"))
    patient = relationship("Patient", back_populates="medications")
    prescribed_by_doctor = relationship("Doctor", back_populates="medications_prescribed")
