import Course from "../../domain/Course";

export default interface CourseRepository {
	get (courseId: string): Promise<Course>;
}
