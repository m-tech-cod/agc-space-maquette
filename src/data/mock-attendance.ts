import type { AttendanceRecord, AttendanceStatus } from '@/types'

export function getAttendanceRecord(status: AttendanceStatus): AttendanceRecord {
  switch (status) {
    case 'present':
      return {
        status,
        checkInAt: '08h54',
        checkOutAt: null,
        expectedAt: '09h00',
      }
    case 'late':
      return {
        status,
        checkInAt: '09h23',
        checkOutAt: null,
        expectedAt: '09h00',
        lateByMinutes: 23,
      }
    case 'absent':
      return {
        status,
        checkInAt: null,
        checkOutAt: null,
        expectedAt: '09h00',
      }
    default:
      return {
        status: 'none',
        checkInAt: null,
        checkOutAt: null,
        expectedAt: '09h00',
      }
  }
}
