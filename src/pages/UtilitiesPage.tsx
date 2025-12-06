import React, { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  FileArchive, 
  DollarSign, 
  Users, 
  BrainCircuit, 
  HelpCircle, 
  FileText,
  ChevronRight
} from "lucide-react";
import { ExpenseManagement } from "@/components/ExpenseManagement";
import { ProjectCollaboration } from "@/components/ProjectCollaboration";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// New components for the utilities page
const ArchiveFileManagement = () => {
  const years = [2023, 2022, 2021, 2020, 2019];
  const departments = ["Engineering", "Administration", "Finance", "Operations", "Planning"];
  const projectTypes = ["Infrastructure", "Water Resources", "Flood Control", "Environmental"];
  
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const projects = [
    { id: 1, name: "Brahmaputra River Basin Management", year: 2023, department: "Engineering", type: "Water Resources", completion: "95%" },
    { id: 2, name: "Flood Control System Upgrade", year: 2022, department: "Operations", type: "Flood Control", completion: "100%" },
    { id: 3, name: "Environmental Impact Assessment", year: 2021, department: "Planning", type: "Environmental", completion: "100%" },
    { id: 4, name: "Bridge Construction Project", year: 2023, department: "Engineering", type: "Infrastructure", completion: "78%" },
    { id: 5, name: "Water Quality Monitoring", year: 2022, department: "Operations", type: "Water Resources", completion: "100%" },
    { id: 6, name: "Flood Prediction System", year: 2021, department: "Engineering", type: "Flood Control", completion: "100%" },
    { id: 7, name: "Dam Renovation Project", year: 2020, department: "Engineering", type: "Infrastructure", completion: "100%" },
    { id: 8, name: "Wetland Conservation", year: 2019, department: "Planning", type: "Environmental", completion: "100%" },
  ];
  
  const filteredProjects = projects.filter(project => {
    if (selectedYear && project.year !== selectedYear) return false;
    if (selectedDepartment && project.department !== selectedDepartment) return false;
    if (selectedType && project.type !== selectedType) return false;
    return true;
  });
  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Archive & File Management</h1>
          <p className="text-gray-600 mt-1">Access and manage completed projects with timeline-based filtering</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Filter Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <Button 
                  key={year}
                  variant={selectedYear === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <div className="flex flex-wrap gap-2">
              {departments.map(dept => (
                <Button 
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDepartment(selectedDepartment === dept ? null : dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map(type => (
                <Button 
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Project Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Year</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Completion</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map(project => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{project.name}</td>
                  <td className="px-4 py-3 text-sm">{project.year}</td>
                  <td className="px-4 py-3 text-sm">{project.department}</td>
                  <td className="px-4 py-3 text-sm">{project.type}</td>
                  <td className="px-4 py-3 text-sm">{project.completion}</td>
                  <td className="px-4 py-3 text-sm">
                    <Button variant="outline" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-3 text-sm text-center text-gray-500">
                    No projects match your filter criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AIPredictor = () => {
  const [projectType, setProjectType] = useState("infrastructure");
  const [projectSize, setProjectSize] = useState("medium");
  const [location, setLocation] = useState("urban");
  
  const predictions = {
    infrastructure: {
      small: {
        urban: { cost: "₹1.2-1.5 Cr", timeline: "6-8 months", resources: "15-20 personnel" },
        rural: { cost: "₹0.9-1.2 Cr", timeline: "7-9 months", resources: "12-18 personnel" }
      },
      medium: {
        urban: { cost: "₹4.5-5.8 Cr", timeline: "12-15 months", resources: "30-40 personnel" },
        rural: { cost: "₹3.8-4.9 Cr", timeline: "14-18 months", resources: "25-35 personnel" }
      },
      large: {
        urban: { cost: "₹12-15 Cr", timeline: "24-30 months", resources: "50-70 personnel" },
        rural: { cost: "₹10-13 Cr", timeline: "28-36 months", resources: "45-60 personnel" }
      }
    },
    waterResources: {
      small: {
        urban: { cost: "₹2.1-2.8 Cr", timeline: "8-10 months", resources: "18-25 personnel" },
        rural: { cost: "₹1.8-2.4 Cr", timeline: "9-12 months", resources: "15-22 personnel" }
      },
      medium: {
        urban: { cost: "₹6.5-8.2 Cr", timeline: "15-20 months", resources: "35-45 personnel" },
        rural: { cost: "₹5.5-7.2 Cr", timeline: "18-24 months", resources: "30-40 personnel" }
      },
      large: {
        urban: { cost: "₹18-22 Cr", timeline: "30-36 months", resources: "60-80 personnel" },
        rural: { cost: "₹15-19 Cr", timeline: "32-40 months", resources: "55-70 personnel" }
      }
    },
    floodControl: {
      small: {
        urban: { cost: "₹2.5-3.2 Cr", timeline: "7-9 months", resources: "20-25 personnel" },
        rural: { cost: "₹2.0-2.7 Cr", timeline: "8-11 months", resources: "18-23 personnel" }
      },
      medium: {
        urban: { cost: "₹7.5-9.5 Cr", timeline: "14-18 months", resources: "40-50 personnel" },
        rural: { cost: "₹6.5-8.5 Cr", timeline: "16-22 months", resources: "35-45 personnel" }
      },
      large: {
        urban: { cost: "₹20-25 Cr", timeline: "28-34 months", resources: "65-85 personnel" },
        rural: { cost: "₹17-22 Cr", timeline: "30-38 months", resources: "60-75 personnel" }
      }
    }
  };
  
  const currentPrediction = predictions[projectType as keyof typeof predictions][projectSize as keyof typeof predictions.infrastructure][location as keyof typeof predictions.infrastructure.small];
  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Project Predictor</h1>
          <p className="text-gray-600 mt-1">Estimate project costs, timelines, and requirements based on historical data</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Project Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <div className="flex flex-col space-y-2">
                <Button 
                  variant={projectType === "infrastructure" ? "default" : "outline"}
                  onClick={() => setProjectType("infrastructure")}
                  className="justify-start"
                >
                  Infrastructure Development
                </Button>
                <Button 
                  variant={projectType === "waterResources" ? "default" : "outline"}
                  onClick={() => setProjectType("waterResources")}
                  className="justify-start"
                >
                  Water Resources Management
                </Button>
                <Button 
                  variant={projectType === "floodControl" ? "default" : "outline"}
                  onClick={() => setProjectType("floodControl")}
                  className="justify-start"
                >
                  Flood Control Systems
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Size</label>
              <div className="flex gap-2">
                <Button 
                  variant={projectSize === "small" ? "default" : "outline"}
                  onClick={() => setProjectSize("small")}
                  size="sm"
                >
                  Small
                </Button>
                <Button 
                  variant={projectSize === "medium" ? "default" : "outline"}
                  onClick={() => setProjectSize("medium")}
                  size="sm"
                >
                  Medium
                </Button>
                <Button 
                  variant={projectSize === "large" ? "default" : "outline"}
                  onClick={() => setProjectSize("large")}
                  size="sm"
                >
                  Large
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
              <div className="flex gap-2">
                <Button 
                  variant={location === "urban" ? "default" : "outline"}
                  onClick={() => setLocation("urban")}
                  size="sm"
                >
                  Urban
                </Button>
                <Button 
                  variant={location === "rural" ? "default" : "outline"}
                  onClick={() => setLocation("rural")}
                  size="sm"
                >
                  Rural
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">AI Prediction Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-semibold mb-1">Estimated Cost</div>
              <div className="text-2xl font-bold">{currentPrediction.cost}</div>
              <div className="text-sm text-gray-600 mt-2">Based on similar projects and current market rates</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-semibold mb-1">Timeline</div>
              <div className="text-2xl font-bold">{currentPrediction.timeline}</div>
              <div className="text-sm text-gray-600 mt-2">Including planning, execution, and completion phases</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 font-semibold mb-1">Resource Requirements</div>
              <div className="text-2xl font-bold">{currentPrediction.resources}</div>
              <div className="text-sm text-gray-600 mt-2">Including engineers, laborers, and support staff</div>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-yellow-800 mb-2">Key Risk Factors</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Weather conditions may impact timeline by ±15%</li>
              <li>Material price fluctuations could affect cost by ±8%</li>
              <li>Regulatory approvals may introduce delays of 1-3 months</li>
              <li>Labor availability in peak seasons may require additional planning</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Consider early procurement of critical materials</li>
              <li>Plan for 10% contingency in budget allocation</li>
              <li>Initiate regulatory approvals at least 2 months before project start</li>
              <li>Implement phased execution approach to optimize resource utilization</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

const QueryManagement = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Query Management Portal</h1>
          <p className="text-gray-600 mt-1">Centralized query handling and resolution system</p>
        </div>
        <Button>
          Submit New Query
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-blue-700">Open</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-yellow-700">In Progress</h3>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-green-700">Resolved</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gray-50 border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-700">Closed</h3>
              <p className="text-2xl font-bold">45</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Queries</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#QRY-2023-001</td>
                <td className="py-3 px-4">Project timeline clarification</td>
                <td className="py-3 px-4">Project</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Open</span>
                </td>
                <td className="py-3 px-4">2023-06-15</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#QRY-2023-002</td>
                <td className="py-3 px-4">Budget allocation request</td>
                <td className="py-3 px-4">Financial</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">In Progress</span>
                </td>
                <td className="py-3 px-4">2023-06-12</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#QRY-2023-003</td>
                <td className="py-3 px-4">Technical specification document</td>
                <td className="py-3 px-4">Technical</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Resolved</span>
                </td>
                <td className="py-3 px-4">2023-06-10</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#QRY-2023-004</td>
                <td className="py-3 px-4">RTI information request</td>
                <td className="py-3 px-4">RTI</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">Closed</span>
                </td>
                <td className="py-3 px-4">2023-06-05</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const APAARManagement = () => {
  const years = [2023, 2022, 2021, 2020, 2019];
  const [selectedYear, setSelectedYear] = useState(2023);
  
  const apaarData = {
    2023: { completed: 45, pending: 12, total: 57, averageScore: 8.2 },
    2022: { completed: 52, pending: 0, total: 52, averageScore: 7.9 },
    2021: { completed: 48, pending: 0, total: 48, averageScore: 7.7 },
    2020: { completed: 50, pending: 0, total: 50, averageScore: 7.5 },
    2019: { completed: 47, pending: 0, total: 47, averageScore: 7.8 },
  };
  
  const currentData = apaarData[selectedYear as keyof typeof apaarData];
  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">APAAR Management</h1>
          <p className="text-gray-600 mt-1">Annual Performance Appraisal Reports tracking and analytics</p>
        </div>
        <Button>
          Generate New APAAR
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 mb-6">
          {years.map(year => (
            <Button 
              key={year}
              variant={selectedYear === year ? "default" : "outline"}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-4 bg-blue-50">
            <h3 className="text-sm font-medium text-blue-700">Total APAARs</h3>
            <p className="text-3xl font-bold">{currentData.total}</p>
          </Card>
          
          <Card className="p-4 bg-green-50">
            <h3 className="text-sm font-medium text-green-700">Completed</h3>
            <p className="text-3xl font-bold">{currentData.completed}</p>
          </Card>
          
          <Card className="p-4 bg-yellow-50">
            <h3 className="text-sm font-medium text-yellow-700">Pending</h3>
            <p className="text-3xl font-bold">{currentData.pending}</p>
          </Card>
          
          <Card className="p-4 bg-purple-50">
            <h3 className="text-sm font-medium text-purple-700">Average Score</h3>
            <p className="text-3xl font-bold">{currentData.averageScore}/10</p>
          </Card>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Employee ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">EMP-001</td>
                <td className="py-3 px-4">Rajesh Kumar</td>
                <td className="py-3 px-4">Engineering</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span>
                </td>
                <td className="py-3 px-4">8.5/10</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">EMP-002</td>
                <td className="py-3 px-4">Priya Singh</td>
                <td className="py-3 px-4">Administration</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span>
                </td>
                <td className="py-3 px-4">9.2/10</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">EMP-003</td>
                <td className="py-3 px-4">Amit Sharma</td>
                <td className="py-3 px-4">Finance</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Pending</span>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">Fill</Button>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">EMP-004</td>
                <td className="py-3 px-4">Neha Patel</td>
                <td className="py-3 px-4">Operations</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Completed</span>
                </td>
                <td className="py-3 px-4">7.8/10</td>
                <td className="py-3 px-4">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const UtilitiesPage = () => {
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  
  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onLoginClick={() => {}} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Utilities</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Tabs defaultValue="utilities" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="utilities">Utilities</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="utilities" className="space-y-6">
              <h1 className="text-3xl font-bold">Utilities</h1>
              <p className="text-gray-600 mb-6">Access essential tools and services for project management and administration</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Expense Management Portal */}
                <Link to="/expense-management">
                  <Card className="p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Expense Management Portal</h3>
                        <p className="text-gray-600 text-sm mt-1">Track project budgets, expenses, and payment schedules</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
                
                {/* Archive & File Management Portal */}
                <Link to="/utilities?tab=archive">
                  <Card className="p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileArchive className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Archive & File Management</h3>
                        <p className="text-gray-600 text-sm mt-1">Access completed projects with timeline-based filtering</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
                
                {/* Collaboration Hub */}
                <Link to="/project-collaboration">
                  <Card className="p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Collaboration Hub</h3>
                        <p className="text-gray-600 text-sm mt-1">Coordinate with project teams and share progress reports</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
                
                {/* AI Predictor */}
                <Link to="/utilities?tab=ai-predictor">
                  <Card className="p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <BrainCircuit className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">AI Predictor</h3>
                        <p className="text-gray-600 text-sm mt-1">Estimate project costs, timelines, and resource requirements</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
                
                {/* Query Management Portal */}
                <Link to="/utilities?tab=query-management">
                  <Card className="p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Query Management Portal</h3>
                        <p className="text-gray-600 text-sm mt-1">Centralized system for handling and resolving queries</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-6">
              <h1 className="text-3xl font-bold">Activities</h1>
              <p className="text-gray-600 mb-6">Manage performance tracking and reporting activities</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* APAAR Management */}
                <Link to="/utilities?tab=apaar">
                  <Card className="p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">APAAR Management</h3>
                        <p className="text-gray-600 text-sm mt-1">Generate and track Annual Performance Appraisal Reports</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Dynamic Content Based on URL Parameter */}
          {window.location.search.includes('tab=archive') && (
            <div className="mt-8">
              <ArchiveFileManagement />
            </div>
          )}
          
          {window.location.search.includes('tab=ai-predictor') && (
            <div className="mt-8">
              <AIPredictor />
            </div>
          )}
          
          {window.location.search.includes('tab=query-management') && (
            <div className="mt-8">
              <QueryManagement />
            </div>
          )}
          
          {window.location.search.includes('tab=apaar') && (
            <div className="mt-8">
              <APAARManagement />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UtilitiesPage;