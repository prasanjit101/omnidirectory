import { ArrowDown } from 'lucide-react';
import { Card } from './ui/card';

export default function HowItWorks() {
	return (
		<Card className="p-9 space-y-5">
			<h3 className="text-2xl font-bold">How it works?</h3>
			<ul className="list-decimal p-4 space-y-4">
				<li>
					Upload a file, enter the context that is relevant to the file {`(optional)`} and
					click submit
				</li>
				<li>
					When you want to find a file in the future, even if you forget the name of the
					file or the file has an incomprehensible name. You can use the search bar to
					find the file. Just enter whatever you remember about it.
				</li>
			</ul>
			<p className="">
				NOTE. If the context is not given, the file will be stored with the name and
				additional metadata like the date created, file type, etc.
			</p>
			<p className="">No content of your file is read, ensuring the security of your data.</p>
		</Card>
	);
}
